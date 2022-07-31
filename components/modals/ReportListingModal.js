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
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {Room} from '@mui/icons-material'
import axios from 'axios'

export function ReportListingModal({id,isreportingModalvisible,setisreportingModalvisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    //console.log(isreportingModalvisible);

    const HandleModalOpen=()=>{
      if(isreportingModalvisible !== true){
        //console.log('damn')
      }else{

        onOpen();
        setisreportingModalvisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isreportingModalvisible])

    const [email,setEmail]=useState('')
    const [body,setBody]=useState('')
    const [mobile, setMobile]=useState('');

    const report = {
        email:email,
        mobile:mobile,
        date: new Date(),
        Hid: id,
        body:body
    }

    const ReportListing=async()=>{
      //console.log(report)
        await axios.post('https://keja--app.herokuapp.com/api/reportproperty',{
            report
        }).then((res)=>{
            //console.log(res.data)
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
                <InputGroup>
                    <Input type='email' placeholder='Email' variant='flushed' onChange={((e)=>{setEmail(e.target.value)})}/>
                </InputGroup>
                <InputGroup>
                    <Input type='text' placeholder='Phone Number' variant='flushed' onChange={((e)=>{setMobile(e.target.value)})}/>
                </InputGroup>
                <Textarea placeholder='reason for your complaint' required  maxlength="100" onChange={((e)=>{setBody(e.target.value)})}/>
                <Button
                        mt={4}
                        bg='#ffa31a'
                        type='submit'
                        color='#ffffff'
                        fontFamily='Poppins-bold'
                    onClick={ReportListing}
                    >
                        Submit complaint
                    </Button>
                </Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   
