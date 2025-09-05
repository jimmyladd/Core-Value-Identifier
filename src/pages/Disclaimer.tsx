
import React from 'react'
import { Link } from 'react-router-dom'

const Disclaimer: React.FC = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-bold">Disclaimer</h1>
      <div className="mt-3 space-y-3 text-slate-700">
        <p>
          This app is an educational tool designed to support reflection and discussion about personal values.
          It is <strong>not</strong> medical, psychological, or mental health advice, and it does <strong>not</strong> diagnose,
          treat, or prevent any condition. Using this app does not create a therapist–client relationship.
        </p>
        <p>
          If you have questions about your mental health, please consult a licensed professional. In case of emergency,
          call your local emergency number or go to the nearest emergency department.
        </p>
      </div>
      <div className="mt-6 text-sm">
        <Link to="/" className="underline">Back</Link>
      </div>
    </div>
  )
}

export default Disclaimer
