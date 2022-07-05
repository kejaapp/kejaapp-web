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
    Tabs,
    TabPanel,
    TabList,
    TabPanels,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
    Heading
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'
import signup from '../../pages/api/signup';
import login from '../../pages/api/login';
import { useRouter } from 'next/router';

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
                <Tabs isFitted variant='enclosed' colorScheme="brand">
                  <TabList mb='1em' fontFamily={'Poppins-bold'}>
                    <Tab>Register</Tab>
                    <Tab>Log In</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <Register setIsModalVisible={setIsModalVisible} onClose={onClose}/>
                    </TabPanel>
                    <TabPanel>
                      <SignIn setIsModalVisible={setIsModalVisible} onClose={onClose}/>
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

  //get user
  const [name,setname]=useState('');
  const [email,setemail]=useState('');
  const [mobile,setmobile]=useState('');
  const [password,setpassword]=useState('');
  //handlesignin
  const HandleSignup=async()=>{
    if(!(name,email,mobile,password)){
      
    }
    const user = {name,email,mobile,password}
    //console.log(user)
    signup(user)
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

  const HandleLogin=async()=>{
    const user = {email,password}
    console.log(user)
    login(user)
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
