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
    Input,
    InputGroup,Heading,
    Stack,
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'
import axios from 'axios';
import Cookies from 'universal-cookie';

export function ListingAccountModal({isListingModalvisible,setIsListingModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    //console.log(isListingModalvisible);

    const HandleModalOpen=()=>{
      if(isListingModalvisible !== true){
        //console.log('damn')
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
                  <Heading fontSize='20px' fontFamily='Poppins-bold'>keja<span style={{color:'#ffa31a'}}>.app</span></Heading>
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
  // const [show, setShow] = useState(false);
  // const handleClick = () => setShow(!show);
  const [email,setemail] = useState('');
  const cookies = new Cookies();
  // const [password, setpassword] = useState('')
  const CreateListingAccount = async()=>{
    try{
      await axios.post('https://keja--app.herokuapp.com/api/createlitingaccount',{
        email
      }).then((res)=>{
        console.log(res.status);
        cookies.set('listingemail', email, { path: '/' });
          }).catch((err)=>{
            console.log(err);
          })
        }catch(err){
          console.log(err);
        }
  }

  return(
    <Stack spacing={4}>
      <Text>Confirm Details to start your listing journey</Text>
      <InputGroup>
        <Input type='email' placeholder='Email' variant='flushed' onChange={((e)=>{setemail(e.target.value)})}/>
      </InputGroup>
      {/* <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          variant='flushed'
          onChange={((e)=>setpassword(e.target.))}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick} bg='#fff'>
            {show ? <VisibilityOff/> : <Visibility/>}
          </Button>
        </InputRightElement>
    </InputGroup> */}
    <Button
            mt={4}
            bg='#ffa31a'
            type='submit'
            color='#ffffff'
            fontFamily='Poppins-bold'
            onClick={CreateListingAccount}
          >
            Create Account
          </Button>
    </Stack>
  )
}
