
import React, { useEffect } from 'react'
import { Route, Routes, useLocation, Link } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Instructions from './pages/Instructions'
import Disclaimer from './pages/Disclaimer'
import SelectValues from './pages/SelectValues'
import Results from './pages/Results'
import useStore from './lib/store'
import { loadValuesFromCSV } from './lib/csv'

const App: React.FC = () => {
  const setAllValues = useStore(s => s.setAllValues)
  const location = useLocation()

  useEffect(() => {
    // Load values from CSV on first mount
    loadValuesFromCSV().then(values => {
      setAllValues(values)
    }).catch(err => {
      console.error('Failed to load CSV', err)
      alert('Failed to load the values CSV. Please check the deployment.')
    })
  }, [setAllValues])

  // Minimal header with nav to instructions/disclaimer
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-slate-900">Core Values Shortlist</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/instructions" className="text-slate-600 hover:text-slate-900">Instructions</Link>
            <Link to="/disclaimer" className="text-slate-600 hover:text-slate-900">Disclaimer</Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/select" element={<SelectValues />} />
          <Route path="/results" element={<Results />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-4 text-xs text-slate-500">
          © {new Date().getFullYear()} — Educational tool only. See <Link className="underline" to="/disclaimer">Disclaimer</Link>.
        </div>
      </footer>
    </div>
  )
}

export default App
