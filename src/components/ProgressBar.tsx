
import React from 'react'

const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => {
  const pct = Math.max(0, Math.min(100, Math.round((current / total) * 100)))
  return (
    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
      <div className="h-2 bg-slate-900" style={{ width: pct + '%' }} />
    </div>
  )
}

export default ProgressBar
