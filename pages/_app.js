import { ChakraProvider,Flex } from '@chakra-ui/react';
import '../styles/globals.css'
import Head from 'next/head';
import dynamic from 'next/dynamic'
const Header = dynamic(
  () => import('../components/Header'),
  { ssr: false }
)


function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider >
      <Head>
        <title>Keja.App</title>
        <meta name="description" content="Find ffordable housing around universities and institutions." />
        <link rel="icon" href="/Keja.jpg" />
      </Head>
        <Flex direction='column'>
          <Header />
          <Component {...pageProps} />
        </Flex>
    </ChakraProvider>
  )
}

export default MyApp
