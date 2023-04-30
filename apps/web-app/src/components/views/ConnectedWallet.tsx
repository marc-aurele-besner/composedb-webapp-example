import React, { Fragment, useEffect } from 'react'
import { useAccount, useNetwork, useDisconnect, useEnsAvatar, useEnsName, useSwitchNetwork } from 'wagmi'
import { Text } from '@chakra-ui/react'

import networks from '../../constants/networks'
import ImageButton from '../buttons/ImageButton'

const ConnectedWallet: React.FC = () => {
  const { address, connector, isConnected } = useAccount()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const { data: ensAvatar } = useEnsAvatar({ address })
  const { data: ensName } = useEnsName({ address })
  const { disconnect } = useDisconnect()

  useEffect(() => {
    if (chain && switchNetwork && !networks.find((network) => network.id === chain.id)) {
      switchNetwork(networks[0].id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chain, networks])

  if (!isConnected) {
    return null
  }

  return (
    <Fragment>
      {ensName ? (
        <Text fontSize='2xl' fontWeight='bold' pt='1rem'>
          Wallet: {ensName}
        </Text>
      ) : (
        <Text fontSize='2xl' fontWeight='bold' pt='1rem'>
          Wallet: {address}
        </Text>
      )}
      <Text fontSize='2xl' fontWeight='bold' pt='1rem'>
        Connected with {connector && connector.name}
      </Text>

      {ensAvatar && (
        <Text fontSize='2xl' fontWeight='bold' pt='1rem'>
          ENS avatar {ensAvatar}
        </Text>
      )}
      <ImageButton
        placeholder='Disconnect'
        imagePath='/images/wallets/disconnect.png'
        onClick={() => disconnect()}
        // isLoading={isLoading}
        // isDisabled={isLoading}
      />
    </Fragment>
  )
}

export default ConnectedWallet
