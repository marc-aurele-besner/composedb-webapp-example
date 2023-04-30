import React, { useState, useEffect } from 'react'
import { Center, VStack, Text } from '@chakra-ui/react'
import { useAccount } from 'wagmi'

import BigCard from '../layout/BigCard'
import ConnectWallet from './ConnectWallet'
import ConnectedWallet from './ConnectedWallet'
import Disclaimer from '../modals/Disclaimer'

const Welcome: React.FC = () => {
  const [hasMounted, setHasMounted] = useState(false)
  const { isConnected } = useAccount()

  useEffect(() => {
    setHasMounted(true)
  }, [])

  return (
    <Center>
      <Disclaimer />
      <BigCard w='80vw' h='80vh'>
        <Center>
          <VStack>
            <Text fontSize='2xl' fontWeight='bold' pb='1rem'>
              Welcome to MyMultiSig.app
            </Text>
            <Text fontSize='xl' fontWeight='bold' m='4rem' pt='2rem'>
              A ComposeDB WebApp Example
            </Text>
            {hasMounted && <>{!isConnected ? <ConnectWallet /> : <ConnectedWallet />}</>}
          </VStack>
        </Center>
      </BigCard>
    </Center>
  )
}

export default Welcome
