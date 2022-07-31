import {useState,useEffect} from 'react'
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Stack,
    Center,
    Heading,
    Text,
    Circle
  } from '@chakra-ui/react';
import {Room, AccountCircle} from '@mui/icons-material';
import { AccountModal } from './modals/AccountModal';
import {useRouter} from 'next/router'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import Script from 'next/script'

export default function Nav() {
  const router = useRouter();
  const [isModalvisible,setIsModalVisible]=useState(false);
  const [userid,setUserId] = useState('')
  //get usertoken
  
  const cookies = new Cookies();
  let token = cookies.get('usertoken');

  useEffect(()=>{
    if(token){
      let decoded = jwt_decode(token);
      console.log(decoded.id);
      setUserId(decoded.id);
    }

    //console.log('signedin')
  },[token])

  const [isloggedin,setisLoggedin]=useState(token ? true : false);
  const randomHex = () => `#${Math.floor(Math.random() * 0xffffff).toString(16).padEnd(6, "0")}`;

// console.log(randomHex());
    return (
        <Box bg='#fff' p={3} zIndex='1' m='0' position='sticky'>
          <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>
            <Flex onClick={(()=>router.push('/'))}>
                {/* <Room  style={{color:'#ffa31a'}}/> */}
                <Heading fontSize='20px' fontFamily='Poppins-bold'>
                  keja<span style={{color:'#ffa31a'}}>.app</span>
                </Heading>
            </Flex>
  
            <Flex alignItems={'center'} gap='4'>
              <AccountModal isModalvisible={isModalvisible} setIsModalVisible={setIsModalVisible}/>
              <Stack direction={'row'} spacing={3}>
                <Menu >
                <a href="/listing" 
                        target="_blank"
                        rel="noopener noreferrer"> 
                    <Button bg='#ffa31a' color='#fff'>
                          <Text m='0'>List Apartment</Text>
                    </Button>
                        </a>
                        {isloggedin ? 
                          
                          <MenuButton
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}>
                    <Circle  bg={`${randomHex()}`}  w='35px' h='35px' alignItems='center'>
                            <AccountCircle />
                          </Circle>
                  </MenuButton>
                        :
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <lord-icon
                                src="https://cdn.lordicon.com/dklbhvrt.json"
trigger="loop"
                                    delay="2000"
                                style={{width:'40px',height:"40px",}}
                                >
                            </lord-icon>
                  </MenuButton>}
                  <MenuList alignItems={'center'} >
                    <br />
                    <Center>
                      <Script src="https://cdn.lordicon.com/xdjxvujz.js"></Script>
                    <lord-icon
                                src="https://cdn.lordicon.com/dklbhvrt.json"
trigger="loop"
                                    delay="7000"
                                style={{marginTop:'20px',width:'70px',height:"70px",}}
                                >
                            </lord-icon>
                    </Center>
                    <br />
                    <MenuDivider />
                    <a href="/help/listing" 
                    target="_blank"
                    rel="noopener noreferrer"> 
                      <MenuItem m='0'>List an apartment</MenuItem>
                    </a>
                    <a href="/help/refer" 
                    target="_blank"
                    rel="noopener noreferrer"> 
                      <MenuItem m='0'>Refer your apartment</MenuItem>
                    </a>
                    {/* <a href="/help/ambassador" 
                    target="_blank"
                    rel="noopener noreferrer"> 
                      <MenuItem m='0'>Become an Ambassador</MenuItem>
                    </a> */}
                    <Flex borderTop="1px solid #212222" direction='column'>
                      {isloggedin ?
                        <MenuItem onClick={(()=>router.push(`/profile/${userid}`))} m='0'>Account Settings</MenuItem>
                        :
                        null
                      }
                      {isloggedin ?
                          <Button bg='#212222' color='#fff' m='3' fontFamily='Poppins-bold' onClick={(()=>{cookies.remove('usertoken'); 
                          
                          setTimeout(()=>{
                            router.reload();
                            router.replace('/');
                          },5000)
                          })}>
                            Logout
                          </Button>
                        :
                        <Button bg='#ffa31a' color='#212222' m='3' fontFamily='Poppins-bold' onClick={(()=>{setIsModalVisible(true)})}>
                          Signin
                        </Button>
                      }
                    </Flex>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Box>
    );
  }