import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
// import { LedgerConnector } from '@wagmi/connectors/ledger'
// import { SafeConnector } from '@wagmi/connectors/safe'

import networks from '../../constants/networks'
import providers from '../../constants/providers'

interface Web3ProviderProps {
  children: React.ReactNode
}

const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const { chains, provider, webSocketProvider } = configureChains(networks, providers, { targetQuorum: 2 })

  // Set up client
  const client = createClient({
    autoConnect: true,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'wagmi'
        }
      }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? '',
          showQrModal: true
        }
      }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true
        }
      })
      // new LedgerConnector({
      //   chains
      // })
      // new SafeConnector({
      //   chains,
      //   options: {
      //     allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
      //     debug: false
      //   }
      // })
    ],
    provider,
    webSocketProvider
  })

  return <WagmiConfig client={client}>{children}</WagmiConfig>
}

export default Web3Provider
