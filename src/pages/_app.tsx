import NProgress from 'nprogress'
import Router from 'next/router'
import { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import myTheme from '../styles/theme'
import AppProvider from '../hooks'
import Sidebar from '../components/Sidebar'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const theme = extendTheme(myTheme)

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <AppProvider>
      <ChakraProvider theme={theme}>
        <Sidebar>
          <Component {...pageProps} />
        </Sidebar>
      </ChakraProvider>
    </AppProvider>
  )
}

export default MyApp
