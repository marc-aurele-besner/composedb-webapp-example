import React, { useEffect } from 'react'
import { useAccount } from 'wagmi'
import { Box, Center, VStack } from '@chakra-ui/react'

import Header from './Header'
import Footer from './Footer'
import useCompose from '../../hooks/useCompose'

interface LayoutProps {
  children: React.ReactNode
}

const Page: React.FC<LayoutProps> = ({ children }) => {
  const { address, isConnected } = useAccount()

  const connect = useCompose((state) => state.connect)

  useEffect(() => {
    if (isConnected && address) connect()
  }, [isConnected, address])

  return (
    <Center>
      <VStack w='100%' h='100%' p={1}>
        <Header />
        <Box w='100%' h='max-content' p={1}>
          {children}
        </Box>
        <Footer />
      </VStack>
    </Center>
  )
}

export default Page
