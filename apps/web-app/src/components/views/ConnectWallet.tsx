import React, { Fragment } from 'react'
import { Text } from '@chakra-ui/react'
import { useConnect } from 'wagmi'

import ErrorCard from '../views/ErrorCard'
import ImageButton from '../buttons/ImageButton'

const ConnectWallet: React.FC = () => {
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect()
  return (
    <Fragment>
      <Text fontSize='2xl' fontWeight='bold' pt='2rem' pb='2rem'>
        Connect your wallet
      </Text>
      <ImageButton
        placeholder='MetaMask'
        imagePath='/images/wallets/mm.png'
        onClick={() => connect({ connector: connectors.find((connector) => connector.id === 'metaMask') })}
        isLoading={isLoading && pendingConnector && pendingConnector.id === 'metaMask'}
        isDisabled={isLoading && pendingConnector && pendingConnector.id !== 'metaMask'}
      />
      <ImageButton
        placeholder='CoinBaseWallet'
        imagePath='/images/wallets/cbw.png'
        onClick={() => connect({ connector: connectors.find((connector) => connector.id === 'coinbaseWallet') })}
        isLoading={isLoading && pendingConnector && pendingConnector.id === 'coinbaseWallet'}
        isDisabled={isLoading && pendingConnector && pendingConnector.id !== 'coinbaseWallet'}
      />
      <ImageButton
        placeholder='WalletConnect'
        imagePath='/images/wallets/wc.png'
        onClick={() => connect({ connector: connectors.find((connector) => connector.id === 'walletConnect') })}
        isLoading={isLoading && pendingConnector && pendingConnector.id === 'walletConnect'}
        isDisabled={isLoading && pendingConnector && pendingConnector.id !== 'walletConnect'}
      />
      <ImageButton
        placeholder='Injected'
        imagePath='/images/wallets/injected.png'
        onClick={() => connect({ connector: connectors.find((connector) => connector.id === 'injected') })}
        isLoading={isLoading && pendingConnector && pendingConnector.id === 'injected'}
        isDisabled={isLoading && pendingConnector && pendingConnector.id !== 'injected'}
      />

      {error && <ErrorCard>{error.message}</ErrorCard>}
    </Fragment>
  )
}

export default ConnectWallet
