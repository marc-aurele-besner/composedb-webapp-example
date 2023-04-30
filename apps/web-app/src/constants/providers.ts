import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { publicProvider } from 'wagmi/providers/public'
// import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'

const providers = [
  // jsonRpcProvider({
  //   rpc: (chain) => ({
  //     http: `https://${chain.id}.example.com`
  //   })
  // }),
  publicProvider({ priority: 2 })
]

if (process.env.NEXT_PUBLIC_ALCHEMY_API_KEY) {
  providers.push(
    alchemyProvider({
      priority: 0,
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    })
  )
}

if (process.env.NEXT_PUBLIC_INFURA_API_KEY) {
  providers.push(
    infuraProvider({
      priority: 1,
      apiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY
    })
  )
}

export default providers
