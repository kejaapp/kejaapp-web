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
    useToast,
    Divider
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {Check,RemoveDone} from '@mui/icons-material'
import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import ReactCardCarousel from 'react-card-carousel';

export function SubscriptionModal({isModalvisible,setIsModalVisible,setActive}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    console.log(isModalvisible);

    const HandleModalOpen=()=>{
    	if(isModalvisible === true){
    		onOpen()
    	}
    }
const HandleModalClose=()=>{
    	setIsModalVisible(!isModalvisible)
    	onClose()
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
            <ModalCloseButton onClick={HandleModalClose}/>
            <ModalBody>
              <Subs />
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
      )
}   

const Subs = () =>{
	return(
		<Flex position='relative' h='400px' w='100%' bg='' justify='Center'>
			<ReactCardCarousel autoplay={false} >
				<Flex w='275px' h='350px' borderRadius='5' bg='#212222' color='#fff' direction='column' p='3'>
		        	<Text fontSize='20px' mb='0' fontFamily='Poppins-bold'>Basic Plan</Text>
		        	<Text color='#ffa31a' >KES <span style={{fontSize:'18px',color:"#fff"}}>30</span>/day</Text>
		        	<Divider />
		        	<Flex gap='2' mt='2'>
			        	<Check style={{fontSize:'20px'}}/>
			        	<Text >Browse Unlimited Houses</Text>
		        	</Flex>
		        	<Flex gap='2'>
			        	<Check style={{fontSize:'20px'}}/>
			        	<Text >Unlock all house infomation, reviews, images, contacts, location</Text>
		        	</Flex>
		        	<Flex gap='2'>
			        	<Check style={{fontSize:'20px'}}/>
			        	<Text >Review and rate Houses</Text>
		        	</Flex>
		        	<Flex gap='2'>
			        	<Check style={{fontSize:'20px'}}/>
			        	<Text >Get 24/7  Support</Text>
		        	</Flex>
		        	<Button bg='#ffa31a' >Choose Basic Plan</Button>
		        </Flex>
		        <Flex w='275px' h='350px' borderRadius='5' bg='#fff' color='#212222' direction='column' p='3'>
		        	<Text fontSize='20px' mb='0'>Free Plan</Text>
		        	<Text color='#ffa31a' >KES <span style={{fontSize:'18px',color:"#fff"}}>0</span>/day</Text>
		        	<Divider />
		        	<Flex gap='2' mt='2'>
			        	<RemoveDone style={{fontSize:'20px'}}/>
			        	<Text >Browse Unlimited Houses</Text>
		        	</Flex>
		        	<Flex gap='2' >
			        	<RemoveDone style={{fontSize:'20px'}}/>
			        	<Text >Unlock all house infomation, reviews, images, contacts, location</Text>
		        	</Flex>
		        	<Flex gap='2'>
			        	<RemoveDone style={{fontSize:'20px'}}/>
			        	<Text >Review and rate Houses</Text>
		        	</Flex>
		        	<Flex gap='2' >
			        	<Check style={{fontSize:'20px'}}/>
			        	<Text >Get 24/7  Support</Text>
		        	</Flex>
		        	<Button bg='#ffa31a' >Choose Basic Plan</Button>
		        </Flex>
		      </ReactCardCarousel>
		</Flex>
	)
}