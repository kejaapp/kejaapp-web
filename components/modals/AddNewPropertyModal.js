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
    Heading,
    useToast
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {PhotoCamera, Room} from '@mui/icons-material';
import axios from 'axios';
import PostProperty from '../../pages/api/postproperty';
import Loading from '../loading.js'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

export function AddNewItem({isAddNewPropertyModalvisible,setIsAddNewPropertyModalModalVisible}){
    //capture property details
    const [name,setname]=useState('');
    const [type,settype]=useState('');
    const [landlordname,setlandlordname]=useState('');
    const [code,setcode]=useState('');
    const [mobile,setmobile]=useState('');
    const [price,setprice]=useState('');
    const [size,setsize]=useState('');
    const [school,setschool]=useState('');
    const [area,setarea]=useState('');
    const [description,setdescription]=useState('');
    const [amenities,setamenities]=useState('');
    const [policies,setpolicies]=useState('');
    const [image1,setimage1]=useState('');
    const [propertyPosition, setPropertyPosition] = useState([]);

    //handles upload form
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [active,setActive]=useState(false);
    const [isModalvisible,setIsModalVisible]=useState(false);

    const HandleModalOpen=()=>{

      if(isAddNewPropertyModalvisible === true){
        onOpen();
        setIsAddNewPropertyModalModalVisible(false)
        
      }
    }
    const toast = useToast();

    const cookies = new Cookies();
    let token = cookies.get('usertoken');
    const [uemail,setuemail]=useState('')

    useEffect(()=>{
      HandleModalOpen();
      getPropertyPosition();
      if(token){
      let decoded = jwt_decode(token);
      //console.log(decoded.id);
      setuemail(decoded.email);
      console.log()
    }
    },[isAddNewPropertyModalvisible,propertyPosition])
    
    
     //upload images before submitting requests
     //put the images into an array and loop through to upload the info
     //const images = [image1,image2,image3,image4,image5]
     const images = [...image1]
     // const {...images} = image1
     //console.log(images)
     //new array captures urls to each 
     let newimagearray = []
     //function to upload images
     const handleImageUpload = async () =>{
      console.log('start')
        images.forEach(function(image){
          try{
            //console.log(image)
              const data = new FormData()
                data.append("file", image);
                data.append('upload_preset', 'kejaapp');
                data.append("cloud_name","www-keja-app")
                 axios.post("https://api.cloudinary.com/v1_1/www-keja-app/image/upload",
                  data).then((res)=>{
                    //console.log(res.data.url)
                    //console.log(res.data)
                    newimagearray.push(res.data.url)
                    console.log(newimagearray)
                    return 1;
                  }).catch((err)=>{
                    console.log(err)
                  })
                }catch(error){
                  console.error(error)
                }    
              })  
    }
    //console.log(newimagearray)

    //get location of apartment
    const getPropertyPosition=()=>{
      if("geolocation" in navigator){
        navigator.geolocation.getCurrentPosition(position=>{
          const{latitude,longitude}=position.coords
            //setViewport({...viewport, latitude,longitude})
            setPropertyPosition(`${latitude},${longitude}`)
        })
      }
    } 
    // setLocation(`${propertyPosition.latitude},${propertyPosition.longitude}`)
    //console.log(propertyPosition)
    //create a property object
    const property = {
      name,
      email:uemail,
      type,
      code,
      landlordname,
      mobile,
      price,
      school,
      size,
      area,
      propertyPosition,
      description,
      amenities,
      policies,
      newimagearray,
    }

    //submit the form
    const [issubmitting,setissubmitting] = useState(false)

    const HandleSubmit=async()=>{
      console.log(property)
      //check if location exists
      // if(property.propertyPosition.length === 0){
      //   return toast({ 
      //     title: '',
      //     description: "allow location fetaure, location of each property is required",
      //     status: 'error',
      //     duration: 2000,
      //     isClosable: true,
      //   })
      // }
//upload images
      handleImageUpload()
      console.log(newimagearray)
      setTimeout(()=>{
        if(property.newimagearray !== 0 ){ 
          //initiate listing func.
          toast({
            title: '',
            description: "Wait as we verify and upload your property, it could take a 30secs to 1-min",
            status: 'info',
            duration: 2000,
            isClosable: true,
          })
          //make request to server to start listing
            setissubmitting(true)
              axios.post("http://localhost:5000/api/postproperty",{
                property
              }).then((res)=>{
                //check if listing req failed
                if(res.status === 201 ){
                  setissubmitting(false)
                    return toast({
                        title: res.data,
                        status: 'error',
                        isClosable: true,
                      })
                }
                //success listing
                setissubmitting(false);
                return toast({
                  title: '',
                  description: "Your property has been uploaded successful",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                })
          }).catch((err)=>{
            console.log(err)
          })
        }
        setissubmitting(false)
        return toast({
                    title: 'We could not upload you images, please try again',
                    status: 'error',
                    isClosable: true,
                  })
      },7000)
      //exit out of listing
      
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
                  <Tips isModalvisible={isModalvisible} setIsModalVisible={setIsModalVisible} />
                  <Text onClick={()=>setIsModalVisible(true)} marginLeft={'10px'} color='#ffa31a' fontSize='sm' p='5px 0px'>Tips</Text>
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
                    <Input type='text' variant='flushed' placeholder='House Name' required onChange={((e)=>{setname(e.target.value)})}/>
                    <Input type='text' variant='flushed' placeholder='Landlord Name' required onChange={((e)=>{setlandlordname(e.target.value)})}/>
                    <Input type='tel' variant='flushed' placeholder='Contact' required onChange={((e)=>{setmobile(e.target.value)})}/>
                    <Input type='number' variant='flushed' placeholder='Price' required onChange={((e)=>{setprice(e.target.value)})}/>
                    <Input type='number' variant='flushed' placeholder='size in square feet' required onChange={((e)=>{setsize(e.target.value)})}/>
                    <Select variant='flushed' placeholder='School'  required onChange={((e)=>{setschool(e.target.value)})}>
                        <option value='JKUAT'>Jomo Kenyatta University of Agriculture and Technology</option>
                        {/* <option value='KenyattaUniversty'>Kenyatta University</option> */}
                    </Select>
                    <Select variant='flushed' placeholder='Area'  required onChange={((e)=>{setarea(e.target.value)})}>
                        <option value='gate A'>Gate A</option>
                        <option value='gate B'>Gate B</option>
                        <option value='gate C'>Gate C</option>
                        <option value='gate D'>Gate D</option>
                        <option value='gate E'>Gate E</option>
                        <option value='Gachororo'>Gachororo</option>
                    </Select>
                    <Button onClick={getPropertyPosition}> Allow Location </Button>
                    
                    <Select variant='flushed' placeholder='Property Type'  required onChange={((e)=>{settype(e.target.value)})}>
                        <option value='bedsitter'>Bedsitter</option>
                        <option value='single'>Single</option>
                        <option value='hostel'>Hostel</option>
                        <option value='onebedroom'>One-Bedroom</option>
                        <option value='twobedroom'>Two-Bedroom</option>
                        <option value='threebedroom'>Three-Bedroom</option>
                    </Select>
                    <Textarea placeholder='Description' required  onChange={((e)=>{setdescription(e.target.value)})}/>
                    <Textarea placeholder='Amenities' required onChange={((e)=>{setamenities(e.target.value)})}/>
                    <Textarea placeholder='Policies' required onChange={((e)=>{setpolicies(e.target.value)})}/>
                    {active ?
                        <Flex direction='column'>
                            <Input type='file' accept='.jpg,.jpeg,.png' variant='flushed' required onChange={((e)=>{setimage1(e.target.files)})} multiple/>
                        </Flex> 
                        :
                          <Button onClick={(()=>{setActive(true)})} bg='#eee'> <PhotoCamera/> Upload Images</Button>
                      }
                    <Input type='text' placeholder='referrer code' required onChange={((e)=>{setcode(e.target.value)})}/>
                  </Flex>
                  <Flex gap='2' mt='2' direction={'column'}>
                  
                      <Button bg='#ffa31a' color='#fff' onClick={HandleSubmit}>Add Property</Button>
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

const Tips=({isModalvisible,setIsModalVisible})=>{
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