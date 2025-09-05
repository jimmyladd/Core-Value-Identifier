import React from 'react'
import type { ValueItem } from '../lib/types'

interface Props {
  value: ValueItem
  selected: boolean
  onToggle: () => void
  onPeek: () => void
}

const ValueCard: React.FC<Props> = ({ value, selected, onToggle, onPeek }) => {
  return (
    <div
      className={
        "p-3 rounded-2xl border transition select-none " +
        (selected
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white hover:border-slate-300")
      }
    >
      <div className="flex items-start justify-between gap-3">
        <button onClick={onToggle} className="text-left font-medium flex-1">
          {value.term}
        </button>
        <button
          className={
            "text-xs px-2 py-1 rounded-full border " +
            (selected ? "border-white/40" : "border-slate-300 text-slate-600")
          }
          onClick={onPeek}
          aria-label={"Definition of " + value.term}
        >
          i
        </button>
      </div>
      {/* category intentionally hidden during selection */}
    </div>
  )
}

export default ValueCard
