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
    Heading
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {Room} from '@mui/icons-material';
import axios from 'axios';
import PostProperty from '../../pages/api/postproperty';
import Loading from '../loading.js'

export function EditProperty({isPropertyEditingModalvisible,setisPropertyEditingModalvisible,item}){
    //capture property details
    const [name,setname]=useState(item.name);
    const [type,settype]=useState(item.type);
    const [mobile,setmobile]=useState(item.mobile);
    const [price,setprice]=useState(item.price);
    const [size,setsize]=useState(item.size);
    const [description,setdescription]=useState(item.description);
    const [amenities,setamenities]=useState(item.amenities);
    const [policies,setpolicies]=useState(item.policies);
    
    //handles upload form
    const { isOpen, onOpen, onClose } = useDisclosure();

    const HandleModalOpen=()=>{

      if(isPropertyEditingModalvisible === true){
        onOpen();
        setisPropertyEditingModalvisible(false)
        
      }
    }
    let id = item._id
    useEffect(()=>{
      HandleModalOpen();
      //console.log(item._id)
    },[isPropertyEditingModalvisible])
    
    
    //submit the form
    const [issubmitting,setissubmitting] = useState(false)
    
    const HandleSubmit=async()=>{
      //create a property object
      const editedproperty = {
        id,
        name,
        type,
        mobile,
        price,
        size,
        description,
        amenities,
        policies
      }
      setissubmitting(true);
      //console.log(editedproperty)
        try{
            await axios.post("https://keja--app.herokuapp.com/api/editproperty",{
              editedproperty
            }).then((res)=>{
              if(res.status === 200){
                return setissubmitting(false)
              }
              return console.log(res.status)
            })
        }catch(err){
            //console.log(err)
        }
    }

  //send the post request
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
              {issubmitting?
                <Center >
                  <Loading />
                </Center>
                :
                <>
                <Flex direction='column' gap='3'>
                    <Center>
                      <Text fontSize={'lg'}>Edit Product</Text>
                    </Center>
                    <Flex align={'center'} gap='3'>
                        <Text>Name:</Text>
                        <Input type='text' variant='flushed' placeholder='House Name' value={name} required onChange={((e)=>{setname(e.target.value)})}/>
                    </Flex>
                    <Flex align={'center'} gap='3'>
                        <Text>Phone:</Text>
                        <Input type='tel' variant='flushed' placeholder='Contact' value={mobile} required onChange={((e)=>{setmobile(e.target.value)})}/>
                    </Flex>
                    <Flex align={'center'} gap='3'>
                        <Text>Price:</Text>
                        <Input type='number' variant='flushed' placeholder='Price' value={price} required onChange={((e)=>{setprice(e.target.value)})}/>
                    </Flex>
                    <Flex align={'center'} gap='3'>
                        <Text>Size:</Text>
                        <Input type='number' variant='flushed' placeholder='size in square feet' value={size} required onChange={((e)=>{setsize(e.target.value)})}/>
                    </Flex>
                    <Flex align={'center'} gap='3'>
                        <Text>Type:</Text>
                        <Select variant='flushed' placeholder='Property Type'  value={type} required onChange={((e)=>{settype(e.target.value)})}>
                          <option value='bedsitter'>Bedsitter</option>
                          <option value='single'>Single</option>
                          <option value='hostel'>Hostel</option>
                          <option value='onebedroom'>One-Bedroom</option>
                          <option value='twobedroom'>Two-Bedroom</option>
                          <option value='threebedroom'>Three-Bedroom</option>
                      </Select>
                    </Flex>
                    <Flex align={'center'} gap='3'>
                        <Text>Description:</Text>
                        <Textarea placeholder='Description' value={description} required  onChange={((e)=>{setdescription(e.target.value)})}/>
                    </Flex>
                    <Flex align={'center'} gap='3'>
                        <Text>Amenities:</Text>
                        <Textarea placeholder='Amenities' value={amenities} required onChange={((e)=>{setamenities(e.target.value)})}/>
                    </Flex>
                    <Flex align={'center'} gap='3'>
                        <Text>Policies:</Text>
                        <Textarea placeholder='Policies' value={policies} required onChange={((e)=>{setpolicies(e.target.value)})}/>
                    </Flex>  
                  </Flex>
                  <Flex gap='2' mt='2' direction={'column'}>
                      <Button bg='#ffa31a' color='#fff' onClick={HandleSubmit}>Edit Property</Button>
                      <Button bg='#eee' color='red' border='1px solid red ' onClick={onClose}>Cancel</Button>
                  </Flex>
                </>
                }
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
      )
}
