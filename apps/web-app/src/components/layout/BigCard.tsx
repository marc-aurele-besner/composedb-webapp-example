import React from 'react'
import { Box, useStyleConfig } from '@chakra-ui/react'

interface BigCardProps {
  children: React.ReactNode
  w?: string
  h?: string
}

const BigCard: React.FC<BigCardProps> = ({ children, w = '98vw', h = '80vh' }) => {
  const styles = useStyleConfig('BigCard')
  return (
    <Box w={w} h={h} p={4} m={2} mt={4} borderRadius={10} __css={styles}>
      {children}
    </Box>
  )
}

export default BigCard
