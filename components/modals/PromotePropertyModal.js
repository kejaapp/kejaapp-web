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
    Image,
    Heading
  } from '@chakra-ui/react';
import { useEffect } from 'react';
import {Room} from '@mui/icons-material';
import axios from 'axios'
  export function PromoteProperty({item,isModalvisible,setIsModalVisible}){
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
    const Promoteproperty=async()=>{
        const details = {
            paid:true,
            id:item._id
        }
        //console.log(details)
        try{
            if(details){
                await axios.post('https://keja--app.herokuapp.com/api/promoteproperty',{
                    details
                }).then((res)=>{
                    //console.log(res.data)
                    return setData(res.data)
                }).catch((err)=>{
                    console.log(err)
                })
            }
            console.log('could not find details')
        }catch(err){
            console.log(err)
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
                <Text>Promote this property</Text>
                <Flex direction={'row'} m='2' gap='2'>
                    <Image boxSize={100} borderRadius='10px' src={item.images[0]} alt='school photo' />
                    <Flex direction='column'>
                        <Text fontFamily='Poppins-bold' fontSize='14px' noOfLines={1}>
                            {item.name}
                        </Text>
                        <Text fontSize='14px' noOfLines={1}>
                            {item.area}
                        </Text>
                        <Text fontSize='14px' noOfLines={1}>
                            Ksh {item.price}
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
                        <Button bg='#212222' color='#fff'>Select this Plan</Button>
                    </Flex>
                    <Flex direction='column' bg='#eee' p='2'>
                        <Text fontFamily='Poppins-bold'>
                            Monthly Plan
                        </Text>
                        <Text>Ranks up your property for 1 month</Text>
                        <Text>ksh 600</Text>
                        <Button bg='#212222' color='#fff'>Select this plan</Button>
                    </Flex>
                </Flex>
                <Button bg='#ffa31a' mt='10px' onClick={Promoteproperty}>Pay 600 to Promote {item.name}</Button>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
      )
}