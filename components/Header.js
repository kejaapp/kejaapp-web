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
  } from '@chakra-ui/react';
import {Room, AccountCircle} from '@mui/icons-material';
import { AccountModal } from './modals/AccountModal';
import {useRouter} from 'next/router'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";


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
      //console.log(decoded.id);
      setUserId(decoded.id);
    }

    //console.log('signedin')
  },[token])

  const [isloggedin,setisLoggedin]=useState(token ? true : false);
    return (
        <Box bg='#fff' p={3} zIndex='1' m='0'>
          <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>
            <Flex onClick={(()=>router.push('/'))}>
                {/* <Room  style={{color:'#ffa31a'}}/> */}
                <Heading fontSize='20px' fontFamily='Poppins-bold'>keja<span style={{color:'#ffa31a'}}>.app</span></Heading>
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
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <AccountCircle
                      style={{fontSize:'38px'}}
                    />
                  </MenuButton>
                  <MenuList alignItems={'center'} >
                    <br />
                    <Center>
                      <AccountCircle
                        style={{fontSize:'72px'}}
                      />
                    </Center>
                    <br />
                    <MenuDivider />
                    <a href="/help/listing" 
                    target="_blank"
                    rel="noopener noreferrer"> 
                      <MenuItem m='0'>List an apartment</MenuItem>
                    </a>
                    <a href="/help/listing" 
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
                        <MenuItem 
                          onClick={(()=>{cookies.remove('usertoken'); 
                          setTimeout(()=>{
                            router.push('/');
                          },5000)
                          })} 
                          m='0'>
                            Logout</MenuItem>
                        :
                        <MenuItem onClick={(()=>{setIsModalVisible(true)})} m='0'>Signin</MenuItem>
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