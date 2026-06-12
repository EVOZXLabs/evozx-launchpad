// Konfigurasi EVOZ Network sesuai spesifikasi
export const evozNetwork = {
  id: 805,
  name: 'EVOZ Mainnet',
  network: 'evoz',
  nativeCurrency: {
    decimals: 18,
    name: 'EVOZ',
    symbol: 'EVOZ',
  },
  rpcUrls: {
    default: { http: ['https://rpc.evozscan.com'] },
    public: { http: ['https://rpc.evozscan.com'] },
  },
  blockExplorers: {
    default: { name: 'EvozScan', url: 'https://evozscan.com' },
  },
}

