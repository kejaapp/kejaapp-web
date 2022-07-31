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
    useToast
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {Room,Visibility,VisibilityOff} from '@mui/icons-material'
import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

export function ListingAccountModal({isListingModalvisible,setIsListingModalvisible,setActive}){
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
              <SignIn setActive={setActive}/>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
      )
}   

const SignIn=({setActive})=>{
  const [email,setemail] = useState('');
  const [useremail, setuseremail] = useState('');
  const cookies = new Cookies();
  const toast = useToast()
  // const [password, setpassword] = useState('')
  //https://keja--app.herokuapp.com/api/createlistingaccount
  const CreateListingAccount = async()=>{
    const token = cookies.get('usertoken')
    if(token){
      let decoded = jwt_decode(token);
      //console.log(decoded.id);
      //console.log(decoded.email);
      setuseremail(decoded.email)
    }
    if(useremail !== email){
      console.log(useremail,email)
      return toast({
        title: 'The email provided does not match your current user account, register or sign in and try again.',
        status: 'error',
        isClosable: true,
      })
    }
    try{
      await axios.post('https://keja--app.herokuapp.com/api/createlistingaccount',{
        email
      }).then((res)=>{
            //console.log(res.status);
            if(res.status === 201){
              return toast({
                title: res.data,
                status: 'error',
                isClosable: true,
              })
            }
            toast({
              title: res.data,
              status: 'success',
              isClosable: true,
            })
            return setActive(true)
          }).catch((err)=>{
            console.log(err);
          })
        }catch(err){
          console.log(err);
        }
    
  }

  return(
    <Stack spacing={4}>
      <Text>Confirm Email to start your listing journey</Text>
      <InputGroup>
        <Input type='email' placeholder='Email' variant='flushed' onChange={((e)=>{setemail(e.target.value)})}/>
      </InputGroup>
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
