
export type Category = 'Intrinsic' | 'Extrinsic' | 'Moral'

export interface ValueItem {
  id: string
  term: string
  definition: string
  category: Category
}

export interface CategoryDefinition {
  category: Category
  definition: string
}

export interface SessionResult {
  name: string
  dateISO: string
  values: ValueItem[] // final 10
}
