import React from 'react'
import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { evozNetwork } from '../config/evozNetwork'

// PERHATIAN: Dapatkan Project ID gratis Anda di https://cloud.reown.com
// Ini 100% gratis dan wajib untuk menghubungkan wallet.
const projectId = 'ff9817bb183a9a1e61349b9770c79193'

// Inisialisasi Ethers v6 Adapter
const ethersAdapter = new EthersAdapter()

// Konfigurasi metadata premium untuk pop-up wallet
const metadata = {
  name: 'EVOZX LAUNCHPAD',
  description: 'Premium Token Generator on EVOZ Network',
  url: 'https://evozxlabs.github.io/evozx-launchpad', // URL GitHub Pages Anda
  icons: ['https://avatars.githubusercontent.com/u/37784886'] 
}

// Inisialisasi UI AppKit
createAppKit({
  adapters: [ethersAdapter],
  networks: [evozNetwork],
  metadata,
  projectId,
  themeMode: 'dark',
  themeVariables: {
    '--w3m-accent': '#1DA1F2', // Menggunakan warna biru utama kita
    '--w3m-font-family': '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
  },
  features: {
    analytics: false, // Matikan analytics untuk privasi maksimal
  }
})

export function Web3Provider({ children }) {
  return <>{children}</>
}

