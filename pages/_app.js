import { ChakraProvider,Center,Flex } from '@chakra-ui/react';
import { extendTheme} from '@chakra-ui/react';
import '../styles/globals.css'
import Header from '../components/Header';
import Head from 'next/head';
import {Footer} from './index'

const colors = {
  brand:{
    primary: '#ffa31a',
    secondary: '#212222',
    tertiary: '#eeeeee',
    base:'#ffffff',
  }
}

const theme = extendTheme({colors});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Keja.App</title>
        <meta name="description" content="Find ffordable housing around universities and institutions." />
        <link rel="icon" href="/Keja.jpg" />
      </Head>
        <Flex direction='column'>
          <Header />
          <Component {...pageProps} />
          {/* <Footer /> */}
        </Flex>
    </ChakraProvider>
  )
}

export default MyApp
