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

export function ReportListingModal({isreportingModalvisible,setisreportingModalvisible}){
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
                    <Input type='email' placeholder='Email' variant='flushed'/>
                </InputGroup>
                <InputGroup>
                    <Input type='text' placeholder='Name of apartment' variant='flushed'/>
                </InputGroup>
                <Textarea placeholder='reason for your complaint' required  onChange={((e)=>{setdescription(e.target.value)})}/>
                <Button
                        mt={4}
                        bg='#ffa31a'
                        type='submit'
                        color='#ffffff'
                        fontFamily='Poppins-bold'
                    >
                        Submit report
                    </Button>
                </Stack>
                        </ModalBody>
                    </ModalContent>
                    </Modal>
                </>
      )
}   
