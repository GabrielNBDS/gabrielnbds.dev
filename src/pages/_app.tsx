import NProgress from 'nprogress'
import Router from 'next/router'
import { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'

import myTheme from '../styles/theme'
import Header from '../components/header'

Router.events.on('routeChangeStart', () => {
  NProgress.start()
})

Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const theme = extendTheme(myTheme)

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Header />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
