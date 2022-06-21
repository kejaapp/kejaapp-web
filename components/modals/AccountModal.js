import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Text,
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
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'

export function AccountModal({isModalvisible,setIsModalVisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    console.log(isModalvisible);

    const HandleModalOpen=()=>{
      if(isModalvisible !== true){
        console.log('damn')
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
                      <Room  style={{color:'#ffa31a'}}/>
                      <Text fontFamily='Poppins-bold'>keja.app</Text>
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
                      <Register />
                    </TabPanel>
                    <TabPanel>
                      <SignIn />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
      )
}   

const Register=()=>{
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return(
    <Stack spacing={4}>
      <InputGroup>
        <Input type='text' placeholder='Name' variant='flushed'/>
      </InputGroup>
      <InputGroup>
        <Input type='email' placeholder='Email' variant='flushed'/>
      </InputGroup>
      <InputGroup>
        <Input type='tel' placeholder='phone number' variant='flushed'/>
      </InputGroup>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          variant='flushed'
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
          >
            Sign Up
          </Button>
    </Stack>
  )
}

const SignIn=()=>{
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return(
    <Stack spacing={4}>
      <InputGroup>
        <Input type='email' placeholder='Email' variant='flushed'/>
      </InputGroup>
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          variant='flushed'
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
          >
            Sign In
          </Button>
    </Stack>
  )
}
