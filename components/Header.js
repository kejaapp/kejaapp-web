import {useState} from 'react'
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
    Text
  } from '@chakra-ui/react';
import {Room} from '@mui/icons-material';
import { AccountModal } from './modals/AccountModal';
import {useRouter} from 'next/router'

export default function Nav() {
  const router = useRouter();
  const [isModalvisible,setIsModalVisible]=useState(false);
  console.log(isModalvisible);

    return (
        <Box bg='#fff' p={3} zIndex='1'>
          <Flex h={10} alignItems={'center'} justifyContent={'space-between'}>
            <Flex onClick={(()=>router.push('/'))}>
                <Room  style={{color:'#ffa31a'}}/>
                <Heading fontSize='20px' fontFamily='Poppins-bold'>keja.app</Heading>
            </Flex>
  
            <Flex alignItems={'center'} gap='4'>
              <AccountModal isModalvisible={isModalvisible} setIsModalVisible={setIsModalVisible}/>
              <Stack direction={'row'} spacing={3}>
                <Menu >
                  <Button bg='#ffa31a' onClick={()=>setIsModalVisible(true)}>
                    Sign In
                  </Button>
                  <MenuButton
                    as={Button}
                    rounded={'full'}
                    variant={'link'}
                    cursor={'pointer'}
                    minW={0}>
                    <Avatar
                      size={'sm'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </MenuButton>
                  <MenuList alignItems={'center'} >
                    <br />
                    <Center>
                      <Avatar
                        size={'2xl'}
                        src={'https://avatars.dicebear.com/api/male/username.svg'}
                      />
                    </Center>
                    <br />
                    <Center>
                      <Text>John Doe</Text>
                    </Center>
                    <br />
                    <MenuDivider />
                    <a href="http://localhost:3000/help/listing" 
                    target="_blank"
                    rel="noopener noreferrer"> 
                      <MenuItem>List an apartment</MenuItem>
                    </a>
                    <a href="http://localhost:3000/help/listing" 
                    target="_blank"
                    rel="noopener noreferrer"> 
                      <MenuItem>Refer your apartment</MenuItem>
                    </a>
                    <a href="http://localhost:3000/help/ambassador" 
                    target="_blank"
                    rel="noopener noreferrer"> 
                      <MenuItem>Become an Ambassador</MenuItem>
                    </a>
                    <Flex borderTop="1px solid #212222" direction='column'>
                      <MenuItem onClick={(()=>router.push('http://localhost:3000/profile'))}>Account Settings</MenuItem>
                      <MenuItem>Logout</MenuItem>
                    </Flex>
                  </MenuList>
                </Menu>
              </Stack>
            </Flex>
          </Flex>
        </Box>
    );
  }