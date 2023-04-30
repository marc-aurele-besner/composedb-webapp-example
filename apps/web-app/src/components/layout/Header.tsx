import Link from 'next/link'
import React, { Fragment } from 'react'
import {
  Box,
  HStack,
  Text,
  useMediaQuery,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  useColorMode,
  useStyleConfig
} from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'

import HeaderLink from './HeaderLink'
import HeaderNetworkSelector from './HeaderNetworkSelector'

const HeaderBox: React.FC = () => {
  const [isLargerThan800] = useMediaQuery('(min-width: 800px)', {
    ssr: true,
    fallback: false // return false on the server, and re-evaluate on the client side
  })
  const { colorMode, toggleColorMode } = useColorMode()

  const styles = useStyleConfig('Card')

  const menu = [
    {
      name: 'Create a Todo',
      link: '/createTodo',
      imagePath: '/images/add.png'
    },
    {
      name: 'See all Todos',
      link: '/allTodos',
      imagePath: '/images/list.png'
    }
  ]

  return (
    <Box w='80vw' h='100%' p={4} m={2} mt={4} __css={styles}>
      <HStack>
        <HeaderLink name='Home' link='/' imagePath='/images/to-do.png' />
        {isLargerThan800 ? (
          <Fragment>
            {menu.map((item) => (
              <HeaderLink key={`Link-${item.name}`} name={item.name} link={item.link} imagePath={item.imagePath} />
            ))}
            <Button onClick={toggleColorMode}>Toggle {colorMode === 'light' ? 'Dark' : 'Light'}</Button>
          </Fragment>
        ) : (
          <Box ml='2rem'>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<ChevronDownIcon />}
                color={'white'}
                bg='transparent'
                _focus={{
                  outline: 'none',
                  color: 'gray.600'
                }}
                _active={{
                  outline: 'none',
                  color: 'gray.600'
                }}>
                Menu
              </MenuButton>
              <MenuList bg='gray.200'>
                {menu.map((item) => (
                  <MenuItem key={`MenuItem-${item.link}`} bg='gray.100' color='gray.900'>
                    <Link key={`Link-${item.link}`} href={item.link}>
                      <Text
                        key={`LinkText-${item.link}`}
                        fontSize='lg'
                        fontWeight='bold'
                        color='gray.900'
                        pl='1rem'
                        _hover={{
                          color: 'gray.600'
                        }}>
                        {item.name}
                      </Text>
                    </Link>
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
        )}
        <HeaderNetworkSelector />
      </HStack>
    </Box>
  )
}

export default HeaderBox
