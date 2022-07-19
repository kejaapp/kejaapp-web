import { ChakraProvider,Flex,useToast } from '@chakra-ui/react';
import '../styles/globals.css'
import Head from 'next/head';
import dynamic from 'next/dynamic';
import { useEffect,useState } from 'react';
import Cookies from 'universal-cookie';
import Footer from '../components/Footer.js'

const Header = dynamic(
  () => import('../components/Header'),
  { ssr: false }
)


function MyApp({ Component, pageProps }) {
  const [active,setActive]=useState(false)
  const cookies = new Cookies();
  const toast = useToast();

  useEffect(()=>{
    if( !cookies.get('cookieagreementstatus') ){
      //setActive(true)
      //cookies.set('cookieinfo', 'false', { path: '/' });
       toast({
        title: 'We use cookies on our website to improve your user experience. By using keja.app, you consent to our use of cookies. View our detailed Privacy policy for more',
        variant: 'subtle',
        isClosable: false,
      });
      setTimeout(()=>{
        cookies.set('cookieagreementstatus', 'true', { path: '/' });
      },4000)
    }
    
  },[cookies])
  return (
    <ChakraProvider >
      <Head>
        <title>Keja.App</title>
        <meta name="description" content="Apartments for univeristy and campus students in Jomo Kenyatta University, Mount Kenya university, Kenyatta University " />
        <link rel="icon" href="/Keja.jpg" />
      </Head>
        <Flex direction='column'>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Flex>
    </ChakraProvider>
  )
}

export default MyApp
