import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLaunchpad } from '../hooks/useLaunchpad';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, Download, ExternalLink, ShieldCheck } from 'lucide-react';

export default function TokenGeneratorForm() {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      name: '', symbol: '', supply: '', burnable: false, mintable: false, ownershipEnabled: true,
      maxWalletEnabled: false, maxWalletPercent: 2, maxTxEnabled: false, maxTxPercent: 1,
      tradingControlEnabled: false, buyTaxEnabled: false, buyTax: 0, sellTaxEnabled: false, sellTax: 0,
      website: '', telegram: '', twitter: '', logoURI: ''
    }
  });

  const { 
    loading, txStep, estimatedFee, deployedTokenAddress, calculateFee, deployToken, isConnected 
  } = useLaunchpad();

  // Awasi perubahan nilai form untuk kalkulasi harga otomatis secara real-time
  const allFields = watch();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (allFields.name || allFields.symbol) {
        calculateFee(allFields);
      }
    }, 600); // Debounce rpc call agar tidak membebani network node
    return () => clearTimeout(timer);
  }, [JSON.stringify(allFields), isConnected]);

  const onSubmit = async (data) => {
    if (!isConnected) return alert('Please connect your wallet first');
    try {
      await deployToken(data);
    } catch (err) {
      alert(err?.reason || err?.message || 'Deployment failed');
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        {txStep === 'success' ? (
          /* Premium Success Screen & Verification Guide */
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-evoz-surface border border-evoz-gold/30 rounded-2xl p-8 shadow-neon-gold text-center space-y-6"
          >
            <div className="w-16 h-16 bg-gradient-to-tr from-evoz-gold to-evoz-blue rounded-full flex items-center justify-center mx-auto shadow-neon-blue">
              <ShieldCheck className="w-8 h-8 text-evoz-bg" />
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-evoz-gold tracking-wide">Token Deployed Successfully!</h2>
              <p className="text-evoz-textMuted text-sm">Your decentralized smart contract is now alive on EVOZ Mainnet.</p>
            </div>

            <div className="p-4 bg-evoz-bg rounded-xl border border-evoz-border text-left space-y-3">
              <div>
                <span className="text-xs text-evoz-textMuted block">Token Address</span>
                <span className="text-sm font-mono break-all text-evoz-blue select-all">{deployedTokenAddress}</span>
              </div>
              <div className="flex gap-4 pt-2">
                <a 
                  href={`https://evozscan.com/token/${deployedTokenAddress}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1.5 text-xs text-evoz-textMuted hover:text-evoz-blue transition-colors"
                >
                  View on Explorer <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Serverless Verification Guide section */}
            <div className="border-t border-evoz-border pt-6 text-left space-y-4">
              <h3 className="text-md font-semibold text-evoz-text">Smart Contract Verification Guide</h3>
              <p className="text-xs text-evoz-textMuted leading-relaxed">
                To verify your exact match contract on EvozScan, download the compiled <b>Standard Input JSON</b> configuration file below. Upload this file directly to the compiler interface on the explorer website.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <a 
                  href="https://github.com/EVOZXLabs/evozx-launchpad/raw/main/verification/standard-input.json" 
                  download
                  className="flex-1 bg-gradient-to-r from-evoz-blue to-evoz-blue/80 hover:shadow-neon-blue text-evoz-bg text-sm font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300"
                >
                  <Download className="w-4 h-4" /> Download Standard JSON
                </a>
                <button 
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 border border-evoz-border rounded-xl text-sm text-evoz-textMuted hover:text-evoz-text hover:bg-evoz-border transition-all"
                >
                  Create Another Token
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Main Creation Form */
          <motion.form 
            onSubmit={handleSubmit(onSubmit)}
            className="bg-evoz-surface border border-evoz-border rounded-2xl p-6 sm:p-8 shadow-neon-blue relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-evoz-blue via-evoz-gold to-evoz-blue opacity-50"></div>
            
            <div className="space-y-6">
              {/* Core Token Information Block */}
              <div>
                <h3 className="text-sm font-bold text-evoz-blue uppercase tracking-wider mb-4">1. Core Information</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs text-evoz-textMuted font-medium">Token Name *</label>
                    <input 
                      type="text" required placeholder="eg. Bitcoin"
                      {...register('name')}
                      className="w-full bg-evoz-bg border border-evoz-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-evoz-blue focus:shadow-neon-blue transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs text-evoz-textMuted font-medium">Token Symbol *</label>
                    <input 
                      type="text" required placeholder="eg. BTC"
                      {...register('symbol')}
                      className="w-full bg-evoz-bg border border-evoz-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-evoz-blue focus:shadow-neon-blue transition-all"
                    />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs text-evoz-textMuted font-medium">Total Supply *</label>
                    <input 
                      type="number" required placeholder="eg. 21000000"
                      {...register('supply')}
                      className="w-full bg-evoz-bg border border-evoz-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-evoz-blue focus:shadow-neon-blue transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Advanced Token Features Features Block */}
              <div className="border-t border-evoz-border pt-6">
                <h3 className="text-sm font-bold text-evoz-gold uppercase tracking-wider mb-4">2. Token Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  
                  {/* Feature: Burnable */}
                  <label className="flex items-start gap-3 p-3 bg-evoz-bg rounded-xl border border-evoz-border hover:border-evoz-blue/40 cursor-pointer transition-all select-none">
                    <input type="checkbox" {...register('burnable')} className="mt-1 accent-evoz-blue" />
                    <div>
                      <span className="text-sm font-semibold block">Burnable</span>
                      <span className="text-xs text-evoz-textMuted">Tokens can be permanently destroyed to increase scarcity.</span>
                    </div>
                  </label>

                  {/* Feature: Mintable */}
                  <label className="flex items-start gap-3 p-3 bg-evoz-bg rounded-xl border border-evoz-border hover:border-evoz-blue/40 cursor-pointer transition-all select-none">
                    <input type="checkbox" {...register('mintable')} className="mt-1 accent-evoz-blue" />
                    <div>
                      <span className="text-sm font-semibold block">Mintable</span>
                      <span className="text-xs text-evoz-textMuted">Allows creating extra supply later if needed.</span>
                    </div>
                  </label>

                </div>
              </div>

              {/* Pricing & Deployment Trigger Button Footer */}
              <div className="border-t border-evoz-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <span className="text-xs text-evoz-textMuted block">Service Fee Cost</span>
                  <span className="text-2xl font-extrabold text-evoz-gold tracking-wide">
                    {estimatedFee} <span className="text-sm font-medium text-evoz-text">EVOZX</span>
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto bg-gradient-to-r from-evoz-blue to-evoz-blue/80 hover:shadow-neon-blue text-evoz-bg text-md font-bold py-3.5 px-10 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {txStep === 'approving' ? 'Approving EVOZX...' : 'Deploying Token...'}
                    </>
                  ) : (
                    'Deploy Token'
                  )}
                </button>
              </div>

            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
                    }
                        
