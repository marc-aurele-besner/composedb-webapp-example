import React from 'react'
import { Button, HStack, Image, Text } from '@chakra-ui/react'

interface ImageButtonProps {
  placeholder: string
  imagePath: string
  onClick?: () => void
  isLoading?: boolean
  isDisabled?: boolean
}

const ImageButton: React.FC<ImageButtonProps> = ({ placeholder, imagePath, onClick, isLoading, isDisabled }) => {
  return (
    <Button
      key={placeholder}
      w='94%'
      p={4}
      m={2}
      mt={4}
      borderRadius={10}
      color='gray.700'
      bg='gray.300'
      boxShadow='dark-lg'
      onClick={onClick}
      isLoading={isLoading}
      isDisabled={isDisabled}
      _hover={{
        bg: 'gray.400',
        color: 'dark.700'
      }}>
      <HStack w='100%' justifyContent='center'>
        <Image src={imagePath} alt={placeholder} width={25} height={25} borderRadius='3px' />
        <Text>{placeholder}</Text>
      </HStack>
    </Button>
  )
}

export default ImageButton
