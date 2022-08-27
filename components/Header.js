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
import {Room, AccountCircle,TravelExplore} from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountModal } from './modals/AccountModal';
import {useRouter} from 'next/router'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import Script from 'next/script'
import styles from '../styles/Home.module.css'

export default function Nav() {
  const router = useRouter();
  const [isModalvisible,setIsModalVisible]=useState(false);
  const [userid,setUserId] = useState('')
  const [useremail,setUseremail] = useState('')
  //get usertoken
  
  const cookies = new Cookies();
  let token = cookies.get('usertoken');

  useEffect(()=>{
    if(token){
      let decoded = jwt_decode(token);
      //console.log(decoded);
      setUserId(decoded.id);
      setUseremail(decoded.email)
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
                    <Flex align='center' onClick={(()=>{window.open('/jkuat/all')})} className={styles.headernav}>
                      <TravelExplore /> 
                      <Text m='0' color='#000' > Browse</Text>
                    </Flex>                  
                        <a href="/listing" 
                        target="_blank"
                        rel="noopener noreferrer"> 
                    <Button bg='#ffa31a' color='#fff'>
                          <Text m='0'>List Apartment</Text>
                    </Button>
                        </a>
                        <MenuButton
                      as={Button}
                      rounded={'full'}
                      variant={'link'}
                      cursor={'pointer'}
                      minW={0}
                      pt='1'
                      color='#000'
                      >
                        <MenuIcon />
                    </MenuButton>
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
                    <Center mt='4'>
                    <Text w='80%' fontSize='14px' color='grey'>signed in :{useremail}</Text>
                    </Center>
                      <a href='/help/listing' target='_blank'>
                        <MenuItem m='0' >
                      <Text >List an apartment</Text>
                      </MenuItem>
                      </a>
                      <a href='/jkuat/all' target='_blank'>
                        <MenuItem m='0' >
                      <Text >Browse apartments</Text>
                      </MenuItem>
                      </a>
                    
                    <Flex borderTop="1px solid #212222" direction='column'>
                      {isloggedin ?
                        <MenuItem onClick={(()=>router.push(`/profile/${userid}`))} m='0'>Account Settings</MenuItem>
                        :
                        null
                      }
                      {isloggedin ?
                          <Button bg='#212222' color='#fff' m='3' fontFamily='Poppins-bold' onClick={(()=>{cookies.remove('usertoken'); 
                          
                          setTimeout(()=>{
                            router.push('/');
                            router.reload();
                          },2000)
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