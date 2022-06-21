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
    Image,
    Checkbox, 
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react';
import styled from 'styled-components'
import { useEffect,useState } from 'react';
import {Room} from '@mui/icons-material'

export default function ReviewApartment({isModalvisible,setIsModalVisible}){
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
                  <Text fontFamily={'Poppins-bold'} fontSize='20px'>Review Form</Text>
                  <Flex flexWrap={'wrap'}>
                      <StyledDiv>
                        <Image boxSize={100} objectFit={'cover'} borderRadius='10px' src='https://a0.muscache.com/im/pictures/a003c1a8-0182-4b39-9e48-c6e0be6cbe11.jpg?im_w=320' alt='school photo' />
                      </StyledDiv>
                      <StyledDiv>
                        <Image boxSize={100} objectFit={'cover'} borderRadius='10px' src='https://a0.muscache.com/im/pictures/a003c1a8-0182-4b39-9e48-c6e0be6cbe11.jpg?im_w=320' alt='school photo' />
                      </StyledDiv>
                      <StyledDiv>
                        <Image boxSize={100} objectFit={'cover'} borderRadius='10px' src='https://a0.muscache.com/im/pictures/a003c1a8-0182-4b39-9e48-c6e0be6cbe11.jpg?im_w=320' alt='school photo' />
                      </StyledDiv>
                  </Flex>
                  <Flex direction='column' gap='2' mb='2'> 
                    <Text fontSize='10px' color='grey'>Check the boxes to confirm the house infomation</Text>
                    <Checkbox >Name : Zawadi Apartments</Checkbox>
                    <Checkbox >Price: 6500</Checkbox>
                    <Checkbox >Contact: 075##33###</Checkbox>
                    <Checkbox >Landlord Name: Keja</Checkbox>
                    <Checkbox >House Quality <Text fontSize='10px' color='grey'>i.e(greater than 5/10 score)</Text></Checkbox>
                    <Checkbox >Description <Text fontSize='10px' color='grey'>i.e(greater than 5/10 score)</Text></Checkbox>
                    <Checkbox >Amenities <Text fontSize='10px' color='grey'>i.e(greater than 5/10 score)</Text></Checkbox>
                    <NumberInput defaultValue={3} min={0} max={5}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                    <Textarea placeholder='Give your honest opinion of the house' />
                  </Flex>
                  <Flex gap='2'>
                    <Button bg='#ffa31a' color="#fff" fontFamily='Poppins-bold'>
                      Submit Review
                    </Button>
                    <Button bg='#eee' color="red" fontFamily='Poppins-bold' onClick={onClose}>
                      Cancel
                    </Button>
                  </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
    )
  }
  const StyledSlider = styled.div`
      display: flex;
      overflow: auto;
      white-space:nowrap;
      padding: 5px 0;
      margin: 0 0px;
  `
  
  const StyledDiv = styled.div`
      box-shadow:
      2px 10.9px 10px rgba(0, 0, 0, 0.075),
      16px 87px 80px rgba(0, 0, 0, 0.15)
      ;
      border-radius: 10px;
      margin: 5px
  `