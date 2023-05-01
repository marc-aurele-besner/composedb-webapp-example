import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useAccount } from 'wagmi'
import { DIDSession } from 'did-session'
import { EthereumWebAuth, getAccountId } from '@didtools/pkh-ethereum'
import { ComposeClient } from '@composedb/client'
import type { RuntimeCompositeDefinition } from '@composedb/types'

import { Todos } from '../models'
import { definition } from '../constants/allModels'

interface ComposeStates {
  isConnectionLoading: boolean
  isConnectionSuccess: boolean
  isConnectionError: boolean
  composeDB: ComposeClient | null
  did: string | null
  connectionError: Error | null
}

const defaultComposeStates: ComposeStates = {
  isConnectionLoading: false,
  isConnectionSuccess: false,
  isConnectionError: false,
  composeDB: null,
  did: null,
  connectionError: null
}

interface ComposeStatesAndHelpers extends ComposeStates {
  connect: (ceramic?: string) => Promise<ComposeClient | null>
  getUserAccount: () => Promise<object | null>
  getUserProfile: () => Promise<object | null>
  setUserProfile: (displayName: string) => Promise<object | null>
  getAllTodos: () => Promise<Todos | null>
  addNewTodo: (title: string, description: string, status: string, tags: string) => Promise<object | null>
  changeTodoStatus: (id: string, status: string) => Promise<object | null>
  reset: () => void
}

const useCompose = create<ComposeStatesAndHelpers>()(
  persist(
    (set, get) => ({
      ...defaultComposeStates,
      connect: async (ceramic = 'http://localhost:7007/' as string) => {
        set(() => ({ isConnectionLoading: true }))
        const ethProvider = (window as any).ethereum
        if (!ethProvider) {
          set(() => ({ connectionError: new Error('No Ethereum provider found') }))
          set(() => ({ isConnectionError: true }))
          set(() => ({ isConnectionLoading: false }))
          return null
        }
        const addresses = await ethProvider.request({ method: 'eth_requestAccounts' })
        if (!addresses && addresses[0]) {
          set(() => ({ connectionError: new Error('No address provided') }))
          set(() => ({ isConnectionError: true }))
          set(() => ({ isConnectionLoading: false }))
          return null
        }
        try {
          const accountId = await getAccountId(ethProvider, addresses[0])

          const authMethod = await EthereumWebAuth.getAuthMethod(ethProvider, accountId)

          const compose = new ComposeClient({
            ceramic,
            definition: definition as RuntimeCompositeDefinition
          })
          set(() => ({ composeDB: compose }))

          const session = await DIDSession.authorize(authMethod, { resources: compose.resources })

          compose.setDID(session.did)

          const viewerID = compose.context.getViewerID()

          if (compose.did) {
            const did = compose.did['_id']
            set(() => ({ did }))
          }
          set(() => ({ isConnectionLoading: false }))
          set(() => ({ isConnectionSuccess: true }))
          return compose
        } catch (error) {
          set(() => ({ connectionError: error as Error }))
          set(() => ({ isConnectionError: true }))
          set(() => ({ isConnectionLoading: false }))
          return null
        }
      },
      getUserAccount: async () => {
        const compose = get().composeDB
        if (compose == null) return null
        if (get().did == null) return null
        if (!compose.executeQuery) return null
        const result = await compose.executeQuery(`
          query {
            viewer {
              id
            }
          }
        `)
        if (result && result?.data) return result.data
        else return null
      },
      getUserProfile: async () => {
        const compose = get().composeDB
        if (compose == null) return null
        if (get().did == null) return null
        if (!compose.executeQuery) return null
        const result = await compose.executeQuery(`
          query {
            viewer {
              id,
              profile {
                displayName
              }
            }
          }
        `)
        if (result && result?.data) return result.data
        else return null
      },
      setUserProfile: async (displayName: string) => {
        const compose = get().composeDB
        if (compose == null) return null
        if (get().did == null) return null
        if (!compose.executeQuery) return null
        const result = await compose.executeQuery(`
          mutation {
            createProfile(
              input: {
                content: {
                  displayName: "${displayName}"
                }
              }) {
                document {
                  displayName
                }
              }
            }
        `)
        if (result && result?.data) return result.data
        else return null
      },
      getAllTodos: async () => {
        const compose = get().composeDB
        if (compose == null) return null
        if (get().did == null) return null
        if (!compose.executeQuery) return null
        const result = await compose.executeQuery(`
          query {
            viewer {
              id,
              profile {
                displayName
              },
              todoList(first:50) {
                edges{
                  node{
                    id,
                    title
                    description
                    status
                    tags
                  }
                }
              }
            }
          }
        `)
        if (result && result?.data) return result.data as Todos
        else return null
      },
      addNewTodo: async (title: string, description: string, status: string, tags: string) => {
        const compose = get().composeDB
        if (compose == null) return null
        if (get().did == null) return null
        if (!compose.executeQuery) return null
        const result = await compose.executeQuery(`
          mutation {
            createTodo(
              input: {
                content: {
                  title: "${title}",
                  description: "${description}",
                  status: "${status}",
                  tags: "${tags}"
                }
              }) {
                document {
                  id,
                  title,
                  description,
                  status,
                  tags
                }
              }
            }
        `)
        if (result && result?.data) return result.data
        else return null
      },
      changeTodoStatus: async (id: string, status: string) => {
        const compose = get().composeDB
        if (compose == null) return null
        if (get().did == null) return null
        if (!compose.executeQuery) return null
        const result = await compose.executeQuery(`
          mutation {
            updateTodo(
              input: {
                id: "${id}",
                content: {
                  status: "${status}"
                }
              }) {
                document {
                  title,
                  description,
                  status,
                  tags
                }
              }
            }
        `)
        if (result && result?.data) return result.data
        else return null
      },
      reset: () => {
        set(() => ({ ...defaultComposeStates }))
      }
    }),
    {
      name: 'composeDB-store',
      storage: createJSONStorage(() => localStorage)
    }
  )
)

export default useCompose
