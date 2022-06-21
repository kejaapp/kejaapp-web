import React from 'react'
import {Flex,Text,Button,Image,Center} from '@chakra-ui/react'
import {useRouter} from 'next/router'

export default function AmbassadorInfo(){
  const router = useRouter();
  return(
    <Flex direction={'column'}>
      <Flex w='100%' justify={'space-around'}>
        <Center bg='#212222' w='100%' h='60vh'>
          <Flex direction={'column'} p='2' gap='2'>
            <Text fontSize={'2rem'} fontFamily='Poppins-bold' color='#fff' textAlign={'center'}>
             Help Grow our community around institutions
            </Text>
            <Button bg='#ffa31a' color='#fff' onClick={(()=>{router.push('/profile')})}>Get Started</Button>
          </Flex>
        </Center>
        {/* <Image src='https://a0.muscache.com/im/pictures/a003c1a8-0182-4b39-9e48-c6e0be6cbe11.jpg?im_w=320' alt='' objectFit='cover' boxSize={'200'} borderRadius={'5'}/> */}
      </Flex>
      <Center display={'flex'} flexDirection={'column'} m='20px auto' w='80%' textAlign={'center'} >
        <Text fontSize={'1.3rem'} fontFamily='Poppins-bold' textDecoration={'underline #ffa31a 2px'}>
        As a Keja Ambassador!
        </Text>
        <Text >
          You will help Review Apartments listed by Landlords/Agents to ensure a genuine and legitimate listing.
          You will give honest Feedback.
          You will help landlords/Agents List their Apartments.
          You will help grow the community by referring Us to your peers.
        </Text>
      </Center>
      <Center display={'flex'} flexDirection={'column'} m='20px auto' w='80%' textAlign={'center'} >
        <Text fontSize={'1.3rem'} fontFamily='Poppins-bold' textDecoration={'underline #ffa31a 2px'}>
        What is required to become an ambassador?
        </Text>
        <Text >
            Must be of age 19 and above.
            Must be a Student currently enrolled at an institution.
            Must have a Student registration ID and a National ID.
            Must Be able to present a document for verification.
            Must Submit a Certificate of Good Conduct on application.
        </Text>
      </Center>
      <Center display={'flex'} flexDirection={'column'} m='20px auto' w='80%' textAlign={'center'} >
        <Text fontSize={'1.3rem'} fontFamily='Poppins-bold' textDecoration={'underline #ffa31a 2px'}>
        What Next after submitting your application?
        </Text>
        <Text >
            You will be Contacted after your application has been reviewed.
            A detailed email will be sent to you for further clarification.
        </Text>
      </Center>
      </Flex>
  )}
