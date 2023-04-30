import { extendTheme, defineStyleConfig, type ThemeConfig } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true
}

const theme = extendTheme({
  config,
  styles: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    global: (props: Record<string, any> | StyleFunctionProps) => ({
      'html, body': {
        bgGradient: mode(['linear(to-t, gray.400, gray.200)'], ['linear(to-t, gray.900, gray.700)'])(props),
        color: mode('#000000', '#ffffff')(props),
        fontSize: 'sm',
        lineHeight: 'tall',
        fontFamily: 'Roboto, sans-serif',
        height: 'fit-content',
        minHeight: '100vh'
      },
      a: {
        color: mode('#000000', '#ffffff')(props),
        _hover: {
          textDecoration: 'underline'
        }
      }
    })
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  components: {
    Card: defineStyleConfig({
      baseStyle: {
        borderRadius: 10,
        fontSize: 'sm',
        boxShadow: 'dark-lg',
        bgGradient: ['linear(to-r, gray.500, gray.700)']
      },
      sizes: {
        sm: {
          fontSize: 'sm'
        },
        md: {
          fontSize: 'md'
        }
      },
      defaultProps: {
        size: 'md'
      }
    })
  }
})

export default theme
