
import type { ValueItem, Category } from './types'

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function computeTargetKeep(n: number): number {
  if (n <= 10) return n
  if (n <= 20) return 10
  return Math.ceil(n / 2)
}

export function breakdownByCategory(values: ValueItem[]): { category: Category; count: number; pct: number }[] {
  const counts: Record<Category, number> = { Intrinsic: 0, Extrinsic: 0, Moral: 0 }
  for (const v of values) counts[v.category]++
  const total = values.length || 1
  // Round and adjust to ensure sum = 100
  const raw = (cat: Category) => (counts[cat] / total) * 100
  const pcts = {
    Intrinsic: Math.round(raw('Intrinsic')),
    Extrinsic: Math.round(raw('Extrinsic')),
    Moral: Math.round(raw('Moral')),
  }
  const sum = pcts.Intrinsic + pcts.Extrinsic + pcts.Moral
  if (sum !== 100) {
    // fix the largest category to make total 100
    const entries = Object.entries(pcts) as [Category, number][]
    entries.sort((a, b) => b[1] - a[1])
    const delta = 100 - sum
    pcts[entries[0][0]] += delta
  }
  return [
    { category: 'Intrinsic', count: counts['Intrinsic'], pct: pcts.Intrinsic },
    { category: 'Extrinsic', count: counts['Extrinsic'], pct: pcts.Extrinsic },
    { category: 'Moral', count: counts['Moral'], pct: pcts.Moral },
  ]
}

export function formatResultText(name: string, values: ValueItem[]): string {
  const lines = [`${name}'s Core Values`, '']
  for (const v of values) {
    lines.push(`• ${v.term} — ${v.definition}`)
  }
  return lines.join('\n')
}
