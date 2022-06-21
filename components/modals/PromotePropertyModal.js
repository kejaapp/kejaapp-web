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
    Image
  } from '@chakra-ui/react';
import { useEffect } from 'react';
import {Room} from '@mui/icons-material';

  export function PromoteProperty({isModalvisible,setIsModalVisible}){
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
                <Text>Promote this property</Text>
                <Flex direction={'row'} m='2' gap='2'>
                    <Image boxSize={100} borderRadius='10px' src='https://a0.muscache.com/im/pictures/a003c1a8-0182-4b39-9e48-c6e0be6cbe11.jpg?im_w=320' alt='school photo' />
                    <Flex direction='column'>
                        <Text fontFamily='Poppins-bold' fontSize='14px' noOfLines={1}>
                            Zawadi Apartments
                        </Text>
                        <Text fontSize='14px' noOfLines={1}>
                            Juja,Kiambu
                        </Text>
                        <Text fontSize='14px' noOfLines={1}>
                            Ksh.6,500
                        </Text>
                    </Flex>
                </Flex>
                <Flex direction='column' gap='3' >
                    <Flex direction='column' bg='#eee' p='2'>
                        <Text fontFamily='Poppins-bold'>
                            Basic Plan
                        </Text>
                        <Text fontSize='14px'>Ranks up your property for 1 week</Text>
                        <Text fontSize='14px'>ksh 200</Text>
                        <Button bg='#212222' color='#fff'>Select Plan</Button>
                    </Flex>
                    <Flex direction='column' bg='#eee' p='2'>
                        <Text fontFamily='Poppins-bold'>
                            Monthly Plan
                        </Text>
                        <Text>Ranks up your property for 1 week</Text>
                        <Text>ksh 600</Text>
                        <Button bg='#212222' color='#fff'>Select Plan</Button>
                    </Flex>
                </Flex>
                <Button bg='#ffa31a'>Pay 600 to Promote Zawadi apartments</Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
      )
}