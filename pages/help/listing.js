import React from 'react'
import {Flex,Text,Button,Image,Center} from '@chakra-ui/react'
import {useRouter} from 'next/router'
function ListingIndex() {
  const router = useRouter();
  return(
    <Flex direction={'column'}>
      <Flex w='100%' justify={'space-around'}>
        <Center bg='#212222' w='100%' h='60vh'>
          <Flex direction={'column'} p='2' gap='2'>
            <Text fontSize={'2rem'} fontFamily='Poppins-bold' color='#fff' textAlign={'center'}>
             Start Listing Apartments
            </Text>
            <Button bg='#ffa31a' color='#fff' onClick={(()=>{router.push('http://localhost:3000/profile')})}>Get Started</Button>
          </Flex>
        </Center>
        {/* <Image src='https://a0.muscache.com/im/pictures/a003c1a8-0182-4b39-9e48-c6e0be6cbe11.jpg?im_w=320' alt='' objectFit='cover' boxSize={'200'} borderRadius={'5'}/> */}
      </Flex>
      <Center display={'flex'} flexDirection={'column'} m='20px auto' w='80%' textAlign={'center'} >
        <Text fontSize={'1.3rem'} fontFamily='Poppins-bold' textDecoration={'underline #ffa31a 2px'}>
        Host With Keja and Get Tenants.
        </Text>
        <Text >
          Join a great Community of hosts to create an easier, efficient and reliable experiences 
            for house Hunters.In a matter of minutes, Keja will help your property get the much-needed visibility your apartment needs.
            We bring a commendable traffic of prospective tenants that visit the website every day. 
          </Text>
      </Center>
      <Flex direction='column' >
        <Center>
          <Text textAlign='center' fontSize={'1.3rem'} fontFamily='Poppins-bold' textDecoration={'underline #ffa31a 2px'}>
            How do I post a property for rent on Keja?
          </Text>
        </Center>
        <Flex direction={'column'} p='4' m='0 auto'>
          {post.map((item)=>{
            return(
                <Flex justify={'space-between'} mt='10'>
                  <Center>
                    <Text fontFamily={'Poppins-bold'}>
                      {item.title}
                    </Text>
                  </Center>
                  <Image boxSize={250} boxShadow={'lg'} src={item.img} borderRadius='5px'/>
                </Flex>
            )
          })}
        </Flex>
          <Center m='0 auto'>
            <Text textAlign={'center'}>
             Make sure you post real photos of the rental property to make the most of this free ad posting for property
            </Text>
          </Center>
      </Flex>
      </Flex>
  )}

export default ListingIndex;

const post=[
  {
    id:'1',
    title:"Go to Account Settings",
    img:"../gotosettings.png"
  },
  {
    id:'2',
    title:"select Listing account",
    img:"../gotoListinacc.png"
  },
  {
    id:'3',
    title:"Select Add Property",
    img:"../addproperty.png"
  },
  {
    id:'4',
    title:"Fill in details",
    img:"../filldetails.png"
  },
  {
    id:'5',
    title:"Complete and submit the form",
    img:"../completeForm.png"
  },
]