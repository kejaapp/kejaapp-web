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
    Select,
    Textarea,
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {PhotoCamera, Room} from '@mui/icons-material';

  export function AddNewItem({isAddNewPropertyModalvisible,setIsAddNewPropertyModalModalVisible}){
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const [active,setActive]=useState(false);
    const [isModalvisible,setIsModalVisible]=useState(false);
    console.log(isAddNewPropertyModalvisible);

    const HandleModalOpen=()=>{

      if(isAddNewPropertyModalvisible !== true){
        console.log('damn')
      }else{

        onOpen();
        setIsAddNewPropertyModalModalVisible(false)
      }
    }

    useEffect(()=>{
      HandleModalOpen();
    },[isAddNewPropertyModalvisible])
    
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
                  <Tips isModalvisible={isModalvisible} setIsModalVisible={setIsModalVisible} />
                  <Text onClick={()=>setIsModalVisible(true)} marginLeft={'10px'} color='#ffa31a' fontSize='sm' p='5px 0px'>Tips</Text>
                </Center>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
                <Flex direction='column' gap='3'>
                    <Input type='Email' variant='flushed' placeholder='Email'  required/>
                    <Input type='text' variant='flushed' placeholder='House Name' required/>
                    <Input type='text' variant='flushed' placeholder='Landlord Name' required/>
                    <Input type='tel' variant='flushed' placeholder='Contact' required/>
                    <Input type='text' variant='flushed' placeholder='Agent Name' required/>
                    <Input type='text' variant='flushed' placeholder='Agent contact' required/>
                    <Input type='number' variant='flushed' placeholder='Price' required/>
                    <Select variant='flushed' placeholder='School'  required>
                        <option value='option1'>Jomo Kenyatta University of Agriculture and Technology</option>
                        <option value='option2'>Kenyatta University</option>
                    </Select>
                    <Select variant='flushed' placeholder='Area'  required>
                        <option value='option1'>Gate A</option>
                        <option value='option2'>Gate B</option>
                        <option value='option3'>Gate C</option>
                        <option value='option3'>Gate D</option>
                        <option value='option3'>Gate E</option>
                        <option value='option3'>Gachororo</option>
                    </Select>
                    <Select variant='flushed' placeholder='Property Type'  required>
                        <option value='option1'>Bedsitter</option>
                        <option value='option2'>Single</option>
                        <option value='option3'>Hostel</option>
                        <option value='option3'>One-Bedroom</option>
                        <option value='option3'>Two-Bedroom</option>
                        <option value='option3'>Three-Bedroom</option>
                    </Select>
                    <Textarea placeholder='Description' required/>
                    <Textarea placeholder='Amenities' required/>
                    <Textarea placeholder='Policies' required/>
                    {active ?
                        <Flex direction='column'>
                            <Input type='file' accept='.jpg,.jpeg,.png' variant='flushed' required/>
                            <Input type='file' accept='.jpg,.jpeg,.png' variant='flushed' required/>
                            <Input type='file' accept='.jpg,.jpeg,.png' variant='flushed' required/>
                            <Input type='file' accept='.jpg,.jpeg,.png' variant='flushed' required/>
                        </Flex> 
                        :
                          <Button onClick={(()=>{setActive(true)})} bg='#eee'> <PhotoCamera/> Upload Images</Button>
                      }
                    <Input type='text' placeholder='Refrence code' required/>
                  </Flex>
                  <Flex gap='2' mt='2' direction={'column'}>
                      <Button bg='#ffa31a' color='#fff'>Add Property</Button>
                      <Button bg='#eee' color='red' border='1px solid red ' onClick={onClose}>Cancel</Button>
                  </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
      )
}

const Tips=({isModalvisible,setIsModalVisible})=>{
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
    return(
        <Modal isOpen={isOpen} onClose={onClose} >
            <ModalOverlay />
            <ModalContent bg='#eee'>
                <ModalHeader color='#ffa31a'>Tips</ModalHeader>
            <ModalCloseButton />
            <ModalBody bg='#eee'>
                <Flex direction={'column'} gap='2'>
                    <Text>
                        The Agent Name and Contact will be used by house Hunters for communication
                    </Text>
                    <Text>
                        Briefly describe how your House is in the description
                    </Text>
                    <Text>
                        Amenities
                    </Text>
                </Flex>
            </ModalBody>
            </ModalContent>
        </Modal>
    )
}