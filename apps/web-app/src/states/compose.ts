import { create } from 'zustand'
import type { ComposeClient } from '@composedb/client'

interface Compose {
  composeDB: ComposeClient | null
  setComposeDB: (composeDB: ComposeClient | null) => void
}

const useComposeStates = create<Compose>((set) => ({
  composeDB: null,
  setComposeDB: (composeDB: ComposeClient | null) => set((state) => ({ composeDB }))
}))

export default useComposeStates
