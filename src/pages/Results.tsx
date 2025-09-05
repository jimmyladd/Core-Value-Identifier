
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useStore from '../lib/store'
import { breakdownByCategory, formatResultText } from '../lib/utils'
import { CATEGORY_DEFINITIONS } from '../lib/categoryDefs'

const Results: React.FC = () => {
  const name = useStore(s => s.name)
  const pool = useStore(s => s.pool)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!name) navigate('/')
    if (pool.length !== 10) navigate('/select')
  }, [name, pool.length, navigate])

  const breakdown = breakdownByCategory(pool)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(formatResultText(name, pool))
      alert('Copied to clipboard')
    } catch {
      alert('Copy failed')
    }
  }

  const onPrint = () => window.print()

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">{name}'s Core Values</h1>
      <p className="mt-2 text-slate-600">Your final 10 values and their definitions.</p>

      <div className="mt-6 space-y-3">
        {pool.map(v => (
          <div key={v.id} className="p-4 bg-white border border-slate-200 rounded-2xl">
            <div className="font-medium">{v.term} <span className="text-xs text-slate-500 ml-2">{v.category}</span></div>
            <div className="text-slate-700 mt-1">{v.definition}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-8 text-xl font-semibold">Category breakdown</h2>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {breakdown.map(b => (
          <div key={b.category} className="p-4 bg-white border border-slate-200 rounded-2xl text-center">
            <div className="text-3xl font-bold">{b.pct}%</div>
            <div className="text-sm mt-1 text-slate-600">{b.category}</div>
            <div className="text-xs mt-1 text-slate-500">{b.count} of 10</div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        <div className="p-4 bg-white border border-slate-200 rounded-2xl">
          <div className="font-medium">What do these mean?</div>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {CATEGORY_DEFINITIONS.map(c => (
              <div key={c.category}>
                <div className="text-sm font-medium">{c.category} Values</div>
                <div className="text-xs text-slate-600 mt-1">{c.definition}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-2">
        <button onClick={onCopy} className="rounded-xl border border-slate-300 px-3 py-2 text-sm">Copy</button>
        <button onClick={onPrint} className="rounded-xl bg-slate-900 text-white px-3 py-2 text-sm">Print / Save PDF</button>
        <Link to="/" className="ml-auto underline text-sm">Start over</Link>
      </div>
    </div>
  )
}

export default Results
