
import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useStore from '../lib/store'
import ValueCard from '../components/ValueCard'
import Modal from '../components/Modal'
import ProgressBar from '../components/ProgressBar'
import { CATEGORY_DEFINITIONS } from '../lib/categoryDefs'

const SelectValues: React.FC = () => {
  const navigate = useNavigate()
  const name = useStore(s => s.name)
  const pool = useStore(s => s.pool)
  const selectedIds = useStore(s => s.selectedIds)
  const target = useStore(s => s.targetKeep)
  const toggleSelect = useStore(s => s.toggleSelect)
  const submitRound = useStore(s => s.submitRound)
  const resetAll = useStore(s => s.resetAll)
  const resetRound = useStore(s => s.resetRound)

  const [query, setQuery] = useState('')
  const [peek, setPeek] = useState<{open: boolean, term?: string, def?: string}>({open: false})

  React.useEffect(() => {
    if (!name) navigate('/')
  }, [name, navigate])

  React.useEffect(() => {
    if (pool.length === 10) {
      navigate('/results')
    }
  }, [pool.length, navigate])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return pool
    return pool.filter(v =>
      v.term.toLowerCase().includes(q) ||
      v.definition.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q)
    )
  }, [pool, query])

  const onSubmit = () => {
    if (selectedIds.size !== target) {
      alert(`Please select exactly ${target} to continue.`)
      return
    }
    submitRound()
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-sm text-slate-600">Participant</div>
          <div className="text-lg font-semibold">{name || '—'}</div>
        </div>
        <div className="w-48 hidden sm:block">
          <ProgressBar current={Math.min(selectedIds.size, target)} total={target || 1} />
          <div className="text-xs text-slate-600 mt-1">Keep {target} this round</div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <input
          className="flex-1 rounded-xl border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-slate-900"
          placeholder="Search values or definitions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="rounded-xl border border-slate-300 px-3 py-2 text-sm"
          onClick={() => setPeek({open: true})}
        >
          What do categories mean?
        </button>
      </div>

      <div className="mt-4 sm:hidden">
        <ProgressBar current={Math.min(selectedIds.size, target)} total={target || 1} />
        <div className="text-xs text-slate-600 mt-1">Keep {target} this round</div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filtered.map(v => (
          <ValueCard
            key={v.id}
            value={v}
            selected={selectedIds.has(v.id)}
            onToggle={() => toggleSelect(v.id)}
            onPeek={() => setPeek({open: true, term: v.term, def: v.definition})}
          />
        ))}
      </div>

      <div className="sticky bottom-0 bg-white border-t border-slate-200 mt-6">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-3">
          <div className="text-sm text-slate-600">
            Selected {Math.min(selectedIds.size, target)} / {target}
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-xl border border-slate-300 px-3 py-2 text-sm" onClick={resetRound}>Clear Selections</button>
            <button
              className={"rounded-xl px-4 py-2 text-sm font-medium " + (selectedIds.size === target ? "bg-slate-900 text-white" : "bg-slate-300 text-slate-600 cursor-not-allowed")}
              onClick={onSubmit}
              disabled={selectedIds.size !== target}
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Peek modal */}
      <Modal open={peek.open} onClose={() => setPeek({open:false})} title={peek.term ? peek.term : "Categories"}>
        {peek.term ? (
          <div>
            <div className="text-slate-700 whitespace-pre-wrap">{peek.def}</div>
          </div>
        ) : (
          <div className="space-y-4">
            {CATEGORY_DEFINITIONS.map(c => (
              <div key={c.category}>
                <div className="font-medium">{c.category} Values</div>
                <div className="text-sm text-slate-700 mt-1">{c.definition}</div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default SelectValues
