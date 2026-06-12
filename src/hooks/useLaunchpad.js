import { useState, useEffect } from 'react';
import { useAppKitProvider, useAppKitAccount } from '@reown/appkit/react';
import { BrowserProvider, Contract, ethers } from 'ethers';
import { FACTORY_ADDRESS, EVOZX_ADDRESS, FACTORY_ABI, ERC20_ABI } from '../config/contracts';

export function useLaunchpad() {
  const { walletProvider } = useAppKitProvider('ethers');
  const { address, isConnected } = useAppKitAccount();
  const [loading, setLoading] = useState(false);
  const [txStep, setTxStep] = useState(''); // 'idle', 'approving', 'deploying', 'success'
  const [estimatedFee, setEstimatedFee] = useState('0');
  const [deployedTokenAddress, setDeployedTokenAddress] = useState(null);

  // Fungsi helper untuk mendapatkan Contract instance dengan Signer (Ethers v6)
  const getContractInstance = async (contractAddress, abi) => {
    if (!walletProvider) throw new Error("Wallet not connected");
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    return new Contract(contractAddress, abi, signer);
  };

  // Fungsi dinamis untuk membaca biaya dari SC (getDeploymentFee)
  const calculateFee = async (rawConfig) => {
    if (!isConnected || !walletProvider) return;
    try {
      const provider = new BrowserProvider(walletProvider);
      const factoryReadOnly = new Contract(FACTORY_ADDRESS, FACTORY_ABI, provider);
      
      const formattedConfig = formatConfigStruct(rawConfig, address);
      const feeInWei = await factoryReadOnly.getDeploymentFee(formattedConfig);
      
      setEstimatedFee(ethers.formatEther(feeInWei));
    } catch (err) {
      console.error("Error calculating fee from contract:", err);
    }
  };

  // Helper untuk melakukan formatting objek sesuai struct TokenConfig di Solidity
  const formatConfigStruct = (raw, userAddress) => {
    return {
      name: raw.name || "",
      symbol: raw.symbol || "",
      supply: ethers.parseEther(raw.supply?.toString() || "0"),
      owner: userAddress || ethers.ZeroAddress,
      chainId: 805, // EVOZ Mainnet Chain ID
      launchKitVersion: 1, 
      burnable: !!raw.burnable,
      mintable: !!raw.mintable,
      ownershipEnabled: !!raw.ownershipEnabled,
      website: raw.website || "",
      telegram: raw.telegram || "",
      twitter: raw.twitter || "",
      logoURI: raw.logoURI || "",
      maxWalletEnabled: !!raw.maxWalletEnabled,
      maxWalletPercent: Number(raw.maxWalletPercent || 0),
      maxTxEnabled: !!raw.maxTxEnabled,
      maxTxPercent: Number(raw.maxTxPercent || 0),
      tradingControlEnabled: !!raw.tradingControlEnabled,
      tradingEnabled: !!raw.tradingEnabled,
      buyTaxEnabled: !!raw.buyTaxEnabled,
      buyTax: Number(raw.buyTax || 0),
      sellTaxEnabled: !!raw.sellTaxEnabled,
      sellTax: Number(raw.sellTax || 0),
      burnTaxShare: Number(raw.burnTaxShare || 0),
      marketingWallet: raw.marketingWallet || userAddress || ethers.ZeroAddress,
      developmentWallet: raw.developmentWallet || userAddress || ethers.ZeroAddress
    };
  };

  // Alur Eksekusi Utama: Approve EVOZX -> Create Token
  const deployToken = async (rawConfig) => {
    setLoading(true);
    setDeployedTokenAddress(null);
    try {
      const factoryContract = await getContractInstance(FACTORY_ADDRESS, FACTORY_ABI);
      const evozxContract = await getContractInstance(EVOZX_ADDRESS, ERC20_ABI);
      
      const formattedConfig = formatConfigStruct(rawConfig, address);
      
      // 1. Ambil harga akurat terbaru dari SC
      const feeInWei = await factoryContract.getDeploymentFee(formattedConfig);

      // Check allowance saat ini
      const currentAllowance = await evozxContract.allowance(address, FACTORY_ADDRESS);
      
      if (currentAllowance < feeInWei) {
        setTxStep('approving');
        const approveTx = await evozxContract.approve(FACTORY_ADDRESS, feeInWei);
        await approveTx.wait(); // Tunggu konfirmasi block jaringan EVOZ
      }

      // 2. Eksekusi Pembuatan Token
      setTxStep('deploying');
      const deployTx = await factoryContract.createToken(formattedConfig);
      const receipt = await deployTx.wait();

      // Cari log event TokenCreated untuk mendapatkan address token baru
      let tokenAddr = null;
      for (const log of receipt.logs) {
        try {
          const parsedLog = factoryContract.interface.parseLog(log);
          if (parsedLog && parsedLog.name === 'TokenCreated') {
            tokenAddr = parsedLog.args.token;
            break;
          }
        } catch (e) {
          // Lewati log yang tidak sesuai struktur parser factory
        }
      }

      setDeployedTokenAddress(tokenAddr);
      setTxStep('success');
    } catch (err) {
      console.error("Transaction failed:", err);
      setTxStep('idle');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    txStep,
    estimatedFee,
    deployedTokenAddress,
    calculateFee,
    deployToken,
    isConnected,
    address
  };
      }
    
