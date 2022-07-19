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
    Textarea,
    Input,
    InputGroup,Heading,
    Stack,
    useToast
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {Room} from '@mui/icons-material'
import axios from 'axios'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

export function AddReviewModal({id,isaddingreviewModalvisible,setisaddingreviewModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    //console.log(isaddingreviewgModalvisible);

    const HandleModalOpen=()=>{
      if(isaddingreviewModalvisible !== true){
        //console.log('damn')
      }else{

        onOpen();
        setisaddingreviewModalvisible(false)
      }
    }
    const cookies = new Cookies();
    let token = cookies.get('usertoken');
    const toast = useToast();
    const [useremail,setuseremail]=useState('')

    useEffect(()=>{
      HandleModalOpen();
      if(token){
      let decoded = jwt_decode(token);
      //console.log(decoded.id);
        setuseremail(decoded.email);
    }

    },[isaddingreviewModalvisible,token])

    const [body,setBody]=useState('')

    const review = {
        email:useremail,
        Hid: id,
        body:body
    }
    const AddReview=async()=>{
      console.log(review.email)
        await axios.post('http://localhost:5000/api/addreview',{
            review
        }).then((res)=>{
            if(res.status === 200){
                setisaddingreviewModalvisible(false)
                return toast({
                    title: 'Review added successfully.',
                    description: 'We appreciate you reviewing this apartment',
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                });
            }
            return toast({
                    title: 'Review failed.',
                    description: res.data,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                });
            // console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }
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
            <Stack spacing={4}>
                {/* <Text>Confirm Details to start this great journey</Text> */}
                <Textarea maxlength="100" placeholder='Review this apartment to help your peers' h="100" onChange={((e)=>{setBody(e.target.value)})}/>
                <Button
                        mt={4}
                        bg='#ffa31a'
                        type='submit'
                        color='#ffffff'
                        fontFamily='Poppins-bold'
                    onClick={AddReview}
                    >
                        Submit review
                    </Button>
                </Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   
