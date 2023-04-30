import React from 'react'
import { Box, Center, VStack } from '@chakra-ui/react'

import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

const Page: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Center>
      <VStack w='100%' h='100%' p={1}>
        <Header />
        <Box w='100%' h='80%' p={1}>
          {children}
        </Box>
        <Footer />
      </VStack>
    </Center>
  )
}

export default Page
