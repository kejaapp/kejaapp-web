import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Flex,
    Center,
    Tab,
    Text,
    Tabs,
    TabPanel,
    TabList,
    TabPanels,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Heading,
    useToast
  } from '@chakra-ui/react';

import { useEffect,useState } from 'react';
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'
//import signup from '../../pages/api/signup';
//import login from '../../pages/api/login';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import axios from 'axios';

export function AccountModal({isModalvisible,setIsModalVisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    //console.log(isModalvisible);

    const HandleModalOpen=()=>{
      if(isModalvisible !== true){
        //console.log('damn')
      }else{

        onOpen();
        setIsModalVisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isModalvisible])
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
                <Center>
                  <Flex>
                  <Heading fontSize='20px' fontFamily='Poppins-bold'>keja<span style={{color:'#ffa31a'}}>.app</span></Heading>
                  </Flex>
                </Center>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Tabs  isFitted variant='enclosed' colorScheme="brand" >
                  <TabList mb='1em' fontFamily={'Poppins-bold'}>
                    <Tab>Log In</Tab>
                    <Tab>Register</Tab>
                  </TabList>
                  <TabPanels>
                    
                    <TabPanel>
                      <SignIn setIsModalVisible={setIsModalVisible} onClose={onClose}/>
                    </TabPanel>
                    <TabPanel>
                      <Register setIsModalVisible={setIsModalVisible} onClose={onClose}/>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
      )
}   

const Register=({onClose})=>{
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();
  //get user
  const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const [mobile,setmobile]=useState('');
  const [password,setpassword]=useState('');
  const [alert,setAlert]=useState('');

  //handlesignin
  const HandleSignup=async()=>{
    if(!(name,email,mobile,password)){
      toast({
        title: 'Account Registration Failed, try Again',
        description: "All inputs are required",
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    const user = {name,email,mobile,password}
    const cookies = new Cookies();
    //'https://keja--app.herokuapp.com/api/signup' || 
    try{
      axios.post('https://keja--app.herokuapp.com/api/signup',{
          user
      }).then((res)=>{
          //console.log(res.status)
          if(res.status === 201){
            return toast({
                      title: 'Acoount Registration Failed,',
                      description: res.data,
                      status: 'error',
                      duration: 9000,
                      isClosable: true,
                    })
          }
          cookies.set('usertoken', res.data, { path: '/' });
          toast({
            title: 'Account registered.',
            description: 'We have created your account for you check your email to verify your account.',
            status: 'success',
            duration: 9000,
            isClosable: true,
          });
          setTimeout(()=>{
            window.location.reload()
          },2000)
          //console.log(res.data)
      }).catch((err)=>{
          console.log(err)
      })
  }catch(err){
      console.log('signup failed',err)
  }
    
    onClose()

  }
  return(
    <Stack spacing={4}>
      <InputGroup>
        <Input required type='text' placeholder='Name' variant='flushed' onChange={((e)=>{setname(e.target.value)})}/>
      </InputGroup>
      <InputGroup>
        <Input required type='email' placeholder='Email' variant='flushed' onChange={((e)=>{setemail(e.target.value)})}/>
      </InputGroup>
      <InputGroup>
        <Input required value={mobile} type="tel" pattern="[0-7]{2}-[0-9]{3}-[0-9]{3}" placeholder='phone number' variant='flushed' onChange={((e)=>{setmobile(e.target.value)})}/>
      </InputGroup>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          variant='flushed'
          onChange={((e)=>{setpassword(e.target.value)})}
          required
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
            {show ? <VisibilityOff/> : <Visibility/>}
          </Button>
        </InputRightElement>
    </InputGroup>
    <Button
            mt={4}
            bg='#ffa31a'
            type='submit'
            color='#ffffff'
            fontFamily='Poppins-bold'
            onClick={HandleSignup}
          >
            Sign Up
          </Button>
          <Text fontSize={'11px'}>By Signing up you agree to our 
                    <a href="help/terms&conditions" 
                        target="_blank"
                        rel="noopener noreferrer" style={{color:'#ffa31a'}}> terms&conditions</a > and our <a href="help/privacypolicy" 
                        target="_blank"
                        rel="noopener noreferrer" style={{color:'#ffa31a'}}>privacy policy</a>.</Text>
    </Stack>
  )
}

const SignIn=({onClose})=>{
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const router = useRouter();
  //get user input
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [submitting,setisSubmitting]=useState(false)
  //handlesignin
  const cookies = new Cookies();
  const toast = useToast();
//https://keja--app.herokuapp.com/api/login
  const HandleLogin=async()=>{
    const user = {email,password}
    //console.log(user)
    await axios.post('https://keja--app.herokuapp.com/api/login',{
            user
        }).then((res)=>{
            //console.log(res.status)
            if(res.status === 201){
              return toast({
                        title: 'Log in Failed,',
                        description: res.data,
                        status: 'error',
                        duration: 9000,
                        isClosable: true,
                      })
            }
            cookies.set('usertoken', res.data, { path: '/' });
            toast({
              title: '',
              description: 'Successfully Logged in',
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
            setTimeout(()=>{
              window.location.reload()
            },2000)
          }).catch((err)=>{
            console.log(err)
        })
    //login(user)
    onClose()
    setisSubmitting(true)
  }
  return(
    <Stack spacing={4}>
      <InputGroup>
        <Input type='email' placeholder='Email' variant='flushed' onChange={((e)=>{setemail(e.target.value)})}/>
      </InputGroup>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          variant='flushed'
          onChange={((e)=>{setpassword(e.target.value)})}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
            {show ? <VisibilityOff/> : <Visibility/>}
          </Button>
        </InputRightElement>
    </InputGroup>
    <Button
            mt={4}
            bg='#ffa31a'
            type='submit'
            color='#ffffff'
            fontFamily='Poppins-bold'
            onClick={HandleLogin}
          >
            Sign In
          </Button>
    </Stack>
  )
}
