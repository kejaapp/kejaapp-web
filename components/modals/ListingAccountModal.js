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

export function ListingAccountModal({isListingModalvisible,setIsListingModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    console.log(isListingModalvisible);

    const HandleModalOpen=()=>{
      if(isListingModalvisible !== true){
        console.log('damn')
      }else{

        onOpen();
        setIsListingModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isListingModalvisible])
    
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
              <SignIn />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
      )
}   

const SignIn=()=>{
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  return(
    <Stack spacing={4}>
      <Text>Confirm Details to start your listing journey</Text>
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
            Create Account
          </Button>
    </Stack>
  )
}
