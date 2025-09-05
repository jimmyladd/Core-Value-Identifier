
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ValueItem } from './types'
import { computeTargetKeep } from './utils'

interface State {
  name: string
  allValues: ValueItem[]
  pool: ValueItem[] // current pool (shrinks each round)
  selectedIds: Set<string>
  targetKeep: number
}

interface Actions {
  setName: (n: string) => void
  setAllValues: (v: ValueItem[]) => void
  toggleSelect: (id: string) => void
  resetRound: () => void
  submitRound: () => void
  resetAll: () => void
}

const useStore = create<State & Actions>()(persist((set, get) => ({
  name: '',
  allValues: [],
  pool: [],
  selectedIds: new Set<string>(),
  targetKeep: 0,

  setName: (n) => set({ name: n }),

  setAllValues: (vals) => {
    const currentPool = vals
    set({
      allValues: vals,
      pool: currentPool,
      selectedIds: new Set<string>(),
      targetKeep: computeTargetKeep(currentPool.length),
    })
  },

  toggleSelect: (id) => {
    const s = new Set(get().selectedIds)
    if (s.has(id)) s.delete(id)
    else {
      if (s.size >= get().targetKeep) return // do not exceed target
      s.add(id)
    }
    set({ selectedIds: s })
  },

  resetRound: () => {
    const p = get().pool
    set({ selectedIds: new Set<string>(), targetKeep: computeTargetKeep(p.length) })
  },

  submitRound: () => {
    const p = get().pool
    const keepIds = get().selectedIds
    const nextPool = p.filter(v => keepIds.has(v.id))
    const nextTarget = computeTargetKeep(nextPool.length)
    set({
      pool: nextPool,
      selectedIds: new Set<string>(),
      targetKeep: nextTarget,
    })
  },

  resetAll: () => {
    const all = get().allValues
    set({
      pool: all,
      selectedIds: new Set<string>(),
      targetKeep: computeTargetKeep(all.length),
    })
  }
}), {
  name: 'values-app-store',
  partialize: (state) => ({
    name: state.name,
  })
}))

export default useStore
