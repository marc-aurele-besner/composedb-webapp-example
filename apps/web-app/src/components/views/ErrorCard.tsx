import React from 'react'
import { Box, Text } from '@chakra-ui/react'

interface ErrorCardProps {
  children: React.ReactNode
}

const ErrorCard: React.FC<ErrorCardProps> = ({ children }) => {
  return (
    <Box
      w='94%'
      p={4}
      m={2}
      mt={4}
      borderRadius={10}
      borderColor='red.500'
      boxShadow='dark-lg'
      bgGradient='linear(to-r, gray.400, gray.200)'>
      <Text fontSize='lg' fontWeight='bold' color='red.500'>
        Error: {children}
      </Text>
    </Box>
  )
}

export default ErrorCard
