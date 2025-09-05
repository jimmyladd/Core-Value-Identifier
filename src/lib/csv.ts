
import Papa from 'papaparse'
import type { ValueItem } from './types'
import { shuffle } from './utils'

// The CSV is placed in /public so we can fetch it at runtime
const CSV_URL = '/core_values.csv'

export async function loadValuesFromCSV(): Promise<ValueItem[]> {
  const res = await fetch(CSV_URL)
  if (!res.ok) throw new Error('CSV fetch failed')
  const text = await res.text()

  const parsed = Papa.parse(text, { header: true, skipEmptyLines: true })
  if (parsed.errors.length) {
    console.error(parsed.errors)
    throw new Error('CSV parse error')
  }

  // Expected columns: Value, Category, Definition
  const rows = (parsed.data as any[]).map((row, i) => ({
    id: `val_${String(i + 1).padStart(3, '0')}`,
    term: String(row['Value']).trim(),
    category: String(row['Category']).trim() as 'Intrinsic' | 'Extrinsic' | 'Moral',
    definition: String(row['Definition']).trim(),
  })) as ValueItem[]

  return shuffle(rows)
}
