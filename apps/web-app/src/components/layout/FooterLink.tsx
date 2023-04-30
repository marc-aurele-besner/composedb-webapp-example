import Link from 'next/link'
import React from 'react'
import { HStack, Text, Image } from '@chakra-ui/react'

interface FooterLinkProps {
  name: string
  link: string
  imagePath: string
  target?: string
}

const FooterLink: React.FC<FooterLinkProps> = ({ name, link, imagePath, target }) => {
  return (
    <Link key={`Link-${link}`} href={link} target={target}>
      <HStack
        border={'1px solid transparent'}
        _hover={{
          border: '1px solid white',
          borderRadius: '10px'
        }}
        p='0.2rem'
        ml='1rem'>
        <Image src={imagePath} alt={name} h='2rem' />
        <Text
          key={`LinkText-${link}`}
          fontSize='lg'
          fontWeight='bold'
          color='white'
          _hover={{
            color: 'gray.800'
          }}>
          {name}
        </Text>
      </HStack>
    </Link>
  )
}

export default FooterLink
