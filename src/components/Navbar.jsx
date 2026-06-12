import React from 'react'

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-evoz-bg/80 backdrop-blur-md border-b border-evoz-border transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-evoz-gold to-evoz-blue p-[2px] shadow-neon-blue">
              <div className="w-full h-full bg-evoz-bg rounded-[10px] flex items-center justify-center font-bold text-xl text-evoz-text">
                E
              </div>
            </div>
            <span className="font-bold text-2xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-evoz-text to-evoz-textMuted">
              EVOZX
            </span>
          </div>

          {/* Web3 Connect Button (Otomatis disediakan oleh AppKit) */}
          <div className="flex items-center hover:shadow-neon-blue-strong transition-shadow duration-300 rounded-full">
            <appkit-button balance="show" />
          </div>

        </div>
      </div>
    </nav>
  )
}

