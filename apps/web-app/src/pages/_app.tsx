import React from 'react'
import Script from 'next/script'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/color-mode'

import Header from '../config'
import Web3Provider from '../components/web3/Web3Provider'
import theme from '../styles/theme'
import Layout from '../components/layout/Page'

const App: React.FC<AppProps> = ({ Component, pageProps = { title: 'ComposeDB WebApp Example' } }) => {
  return (
    <>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Header title={pageProps.title} />
        <Web3Provider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Web3Provider>
      </ChakraProvider>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_APP_GTAG}`}
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_APP_GTAG}');
        `}
      </Script>
    </>
  )
}

export default App
