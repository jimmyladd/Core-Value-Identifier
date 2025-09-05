
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import useStore from '../lib/store'

const Welcome: React.FC = () => {
  const navigate = useNavigate()
  const nameInStore = useStore(s => s.name)
  const setName = useStore(s => s.setName)
  const pool = useStore(s => s.pool)
  const [name, setNameInput] = useState(nameInStore)

  const onStart = () => {
    if (!name.trim()) {
      alert('Please enter your name to begin.')
      return
    }
    setName(name.trim())
    if (pool.length === 0) {
      // CSV might still be loading, but route anyway; selection page will guard
    }
    navigate('/select')
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-3xl font-bold text-slate-900">Core Values Identifier</h1>
      <p className="mt-3 text-slate-600">
        Identify the <strong>10 values</strong> that matter most to you. You’ll start with 222 values and make quick, progressive cuts until only 10 remain.
      </p>

      <div className="mt-6 p-4 bg-white border border-slate-200 rounded-2xl">
        <label className="block text-sm font-medium text-slate-700">Your name</label>
        <input
          className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="e.g., Alex"
          value={name}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <button onClick={onStart} className="mt-4 w-full rounded-xl bg-slate-900 text-white py-2 font-medium">
          Begin
        </button>
      </div>

      <div className="mt-6 text-sm text-slate-600">
        <Link to="/instructions" className="underline">How it works</Link> ·{' '}
        <Link to="/disclaimer" className="underline">Disclaimer</Link>
      </div>
    </div>
  )
}

export default Welcome
