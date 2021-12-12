import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DAppProvider, Config, Polygon, Mumbai } from '@usedapp/core'
import { ChakraProvider } from '@chakra-ui/react'
import '@fontsource/mulish'

const dappConfig: Config = {
  networks: [Mumbai]
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <DAppProvider config={dappConfig}>
        <Component {...pageProps} />
      </DAppProvider>
    </ChakraProvider>
  )
}

export default MyApp
