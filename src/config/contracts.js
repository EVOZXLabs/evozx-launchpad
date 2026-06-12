export const FACTORY_ADDRESS = "0xbA40773bCF0d30e83c4319796Ec45CA31d6e64bB";
export const EVOZX_ADDRESS = "0x032a962F62Fc1cbc15B19767Aa138deA3B454B74";

export const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function approve(address spender, uint256 value) returns (bool)"
];

export const FACTORY_ABI = [
  {
    "inputs": [],
    "name": "LAUNCHKIT_VERSION",
    "outputs": [{"internalType": "uint16", "name": "", "type": "uint16"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {"internalType": "string", "name": "name", "type": "string"},
          {"internalType": "string", "name": "symbol", "type": "string"},
          {"internalType": "uint256", "name": "supply", "type": "uint256"},
          {"internalType": "address", "name": "owner", "type": "address"},
          {"internalType": "uint256", "name": "chainId", "type": "uint256"},
          {"internalType": "uint16", "name": "launchKitVersion", "type": "uint16"},
          {"internalType": "bool", "name": "burnable", "type": "bool"},
          {"internalType": "bool", "name": "mintable", "type": "bool"},
          {"internalType": "bool", "name": "ownershipEnabled", "type": "bool"},
          {"internalType": "string", "name": "website", "type": "string"},
          {"internalType": "string", "name": "telegram", "type": "string"},
          {"internalType": "string", "name": "twitter", "type": "string"},
          {"internalType": "string", "name": "logoURI", "type": "string"},
          {"internalType": "bool", "name": "maxWalletEnabled", "type": "bool"},
          {"internalType": "uint8", "name": "maxWalletPercent", "type": "uint8"},
          {"internalType": "bool", "name": "maxTxEnabled", "type": "bool"},
          {"internalType": "uint8", "name": "maxTxPercent", "type": "uint8"},
          {"internalType": "bool", "name": "tradingControlEnabled", "type": "bool"},
          {"internalType": "bool", "name": "tradingEnabled", "type": "bool"},
          {"internalType": "bool", "name": "buyTaxEnabled", "type": "bool"},
          {"internalType": "uint8", "name": "buyTax", "type": "uint8"},
          {"internalType": "bool", "name": "sellTaxEnabled", "type": "bool"},
          {"internalType": "uint8", "name": "sellTax", "type": "uint8"},
          {"internalType": "uint8", "name": "burnTaxShare", "type": "uint8"},
          {"internalType": "address", "name": "marketingWallet", "type": "address"},
          {"internalType": "address", "name": "developmentWallet", "type": "address"}
        ],
        "internalType": "struct LaunchKitTypes.TokenConfig",
        "name": "config",
        "type": "tuple"
      }
    ],
    "name": "getDeploymentFee",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {"internalType": "string", "name": "name", "type": "string"},
          {"internalType": "string", "name": "symbol", "type": "string"},
          {"internalType": "uint256", "name": "supply", "type": "uint256"},
          {"internalType": "address", "name": "owner", "type": "address"},
          {"internalType": "uint256", "name": "chainId", "type": "uint256"},
          {"internalType": "uint16", "name": "launchKitVersion", "type": "uint16"},
          {"internalType": "bool", "name": "burnable", "type": "bool"},
          {"internalType": "bool", "name": "mintable", "type": "bool"},
          {"internalType": "bool", "name": "ownershipEnabled", "type": "bool"},
          {"internalType": "string", "name": "website", "type": "string"},
          {"internalType": "string", "name": "telegram", "type": "string"},
          {"internalType": "string", "name": "twitter", "type": "string"},
          {"internalType": "string", "name": "logoURI", "type": "string"},
          {"internalType": "bool", "name": "maxWalletEnabled", "type": "bool"},
          {"internalType": "uint8", "name": "maxWalletPercent", "type": "uint8"},
          {"internalType": "bool", "name": "maxTxEnabled", "type": "bool"},
          {"internalType": "uint8", "name": "maxTxPercent", "type": "uint8"},
          {"internalType": "bool", "name": "tradingControlEnabled", "type": "bool"},
          {"internalType": "bool", "name": "tradingEnabled", "type": "bool"},
          {"internalType": "bool", "name": "buyTaxEnabled", "type": "bool"},
          {"internalType": "uint8", "name": "buyTax", "type": "uint8"},
          {"internalType": "bool", "name": "sellTaxEnabled", "type": "bool"},
          {"internalType": "uint8", "name": "sellTax", "type": "uint8"},
          {"internalType": "uint8", "name": "burnTaxShare", "type": "uint8"},
          {"internalType": "address", "name": "marketingWallet", "type": "address"},
          {"internalType": "address", "name": "developmentWallet", "type": "address"}
        ],
        "internalType": "struct LaunchKitTypes.TokenConfig",
        "name": "config",
        "type": "tuple"
      }
    ],
    "name": "createToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {"indexed": true, "internalType": "address", "name": "token", "type": "address"},
      {"indexed": true, "internalType": "address", "name": "creator", "type": "address"},
      {"indexed": false, "internalType": "string", "name": "name", "type": "string"},
      {"indexed": false, "internalType": "string", "name": "symbol", "type": "string"},
      {"indexed": false, "internalType": "uint256", "name": "supply", "type": "uint256"},
      {"indexed": false, "internalType": "uint256", "name": "chainId", "type": "uint256"}
    ],
    "name": "TokenCreated",
    "type": "event"
  }
];
          
