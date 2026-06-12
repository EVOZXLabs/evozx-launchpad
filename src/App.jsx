import React from 'react'
import Navbar from './components/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-evoz-bg text-evoz-text font-sans selection:bg-evoz-blue/30 selection:text-evoz-blue">
      <Navbar />
      
      {/* Main Content Area */}
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
        
        {/* Header Section dengan Animasi Sederhana */}
        <div className="text-center mb-12 space-y-4 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Launch Your Token on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-evoz-blue to-evoz-gold drop-shadow-lg">
              EVOZ Network
            </span>
          </h1>
          <p className="text-evoz-textMuted text-lg md:text-xl max-w-2xl mx-auto">
            No coding required. Secure, fast, and automated smart contract deployment with EVOZX Premium Launchpad.
          </p>
        </div>

        {/* Placeholder untuk Form Generator Token (Tahap Selanjutnya) */}
        <div className="w-full max-w-3xl bg-evoz-surface border border-evoz-border rounded-2xl p-8 shadow-neon-blue relative">
          <div className="absolute inset-0 bg-gradient-to-b from-evoz-blue/5 to-transparent rounded-2xl pointer-events-none"></div>
          <div className="text-center text-evoz-textMuted relative z-10">
            
            import React from 'react'
import Navbar from './components/Navbar'
import TokenGeneratorForm from './components/TokenGeneratorForm'

function App() {
  return (
    <div className="min-h-screen bg-evoz-bg text-evoz-text font-sans selection:bg-evoz-blue/30 selection:text-evoz-blue">
      <Navbar />
      
      <main className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
        
        <div className="text-center mb-10 space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Launch Your Token on <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-evoz-blue to-evoz-gold drop-shadow-lg">
              EVOZ Network
            </span>
          </h1>
          <p className="text-evoz-textMuted text-sm md:text-base max-w-xl mx-auto">
            Secure, precise, and automated smart contract deployment powered by EVOZX Launchpad engine.
          </p>
        </div>

        {/* Pemanggilan Form Premium */}
        <TokenGeneratorForm />

      </main>
    </div>
  )
}

export default App
            
          </div>
        </div>

      </main>
    </div>
  )
}

export default App

