
import React from 'react'
import { Link } from 'react-router-dom'
import { CATEGORY_DEFINITIONS } from '../lib/categoryDefs'

const Instructions: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Instructions</h1>
      <ol className="mt-4 space-y-3 list-decimal list-inside text-slate-700">
        <li>Enter your name.</li>
        <li>Browse the values (search & scroll). Tap a value to <strong>keep</strong> it. Tap <em>(i)</em> for its definition.</li>
        <li>Tap <strong>Submit</strong> to remove everything you didn’t keep.</li>
        <li>Rounds shrink like: <code>222 → 111 → 56 → 28 → 14 → 10</code>. When less than or equal to 20 remain, keep exactly 10.</li>
        <li>When you reach 10, you’ll see your final list with definitions and a category breakdown.</li>
      </ol>

      <h2 className="mt-8 text-xl font-semibold">What do these categories mean?</h2>
      <div className="mt-3 grid gap-3 sm:grid-cols-3">
        {CATEGORY_DEFINITIONS.map((c) => (
          <div key={c.category} className="p-4 bg-white border border-slate-200 rounded-2xl">
            <div className="font-medium">{c.category} Values</div>
            <div className="text-sm text-slate-600 mt-1">{c.definition}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-sm">
        <Link to="/" className="underline">Back</Link>
      </div>
    </div>
  )
}

export default Instructions
