import {
    Modal,ModalOverlay,ModalContent,ModalHeader,ModalBody,ModalCloseButton,useDisclosure,
    Button,Text,Flex,Center,Input,Select,Textarea,Heading,Stack,Container,
    useToast,
    FormControl,FormLabel,FormErrorMessage,FormHelperText,
    Checkbox, CheckboxGroup
  } from '@chakra-ui/react';
import { useEffect,useState } from 'react';
import {PhotoCamera, Room} from '@mui/icons-material';
import axios from 'axios';
import PostProperty from '../../pages/api/postproperty';
import Loading from '../loading.js'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";
import { Step, Steps, useSteps } from 'chakra-ui-steps';
import {useRouter} from 'next/router'

export function AddNewItem({isAddNewPropertyModalvisible,setIsAddNewPropertyModalModalVisible}){
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
    const [location, setlocation] = useState('');

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [active,setActive]=useState(false);
    const [isModalvisible,setIsModalVisible]=useState(false);

    const router = useRouter()
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
      //getPropertyPosition();
      if(token){
      let decoded = jwt_decode(token);
      //console.log(decoded.id);
      setuemail(decoded.email);
      //console.log()
      }
    },[isAddNewPropertyModalvisible])

    const images = [...image1];
    //console.log(images)
    let newimagearray = []

    const handleImageUpload = async () =>{
      //console.log('start')
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
                    //console.log(newimagearray)
                    
                  }).catch((err)=>{
                    console.log(err)
                    return toast({
                      title: 'We could not upload you images, please try again',
                      status: 'error',
                      isClosable: true,
                    })
                  })
                }catch(error){
                  console.error(error)
                }    
              })  
      }
    

    const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({initialStep: 0});
    const property = {
      name,
      email:uemail,
      type,
      code,
      mobile,
      price,
      school,
      size,
      area,
      location,
      description,
      amenities,
      policies,
      newimagearray,
    }
    //console.log(property.name)

    //check for all inputs provided
    const [access,setaccess] = useState(false);

    const [issubmitting,setissubmitting] = useState(false)

    const HandleSubmit=async()=>{
      if(images.length === 0 ){
        return toast({
            title: '',
            description: "No image files were found try again",
            status: 'error',
            duration: 2000,
            isClosable: true,
          })
      }
      toast({
            title: '',
            description: "Wait as we verify and upload your property, it could take a 30secs to 1-min",
            status: 'info',
            duration: 1000,
            isClosable: true,
          })
      setissubmitting(true)
      //check if all fields have been filled
      if(name === '' && type === '' && landlordname === '' && mobile === '' && price === '' && school === '' && size === '' && area === '' && description === '' && amenities === '' && policies === '' ){
        
        toast({
              title: '',
              description: "Make sure all the fields have been filled",
              status: 'error',
              duration: 2000,
              isClosable: true,
            })
        setTimeout(()=>{
          router.reload()  
        },3000)
        
      }
      //upload images
      
      handleImageUpload()
      //console.log(newimagearray)
      setTimeout(()=>{
        if(property.newimagearray.length !== 0 ){ 
          //initiate listing func.
          
          //make request to server to start listinghttps://keja--app.herokuapp.com
             axios.post("https://keja--app.herokuapp.com/api/postproperty",{
                property
              }).then((res)=>{
                //check if listing req failed
                if(res.status === 201 ){
                  setissubmitting(false)
                  //console.log('233')
                    return toast({
                        title: res.data,
                        status: 'error',
                        isClosable: true,
                      })
                }
                //success listing
                if(res.status === 200){
                  reset()
                  onClose()
                  return toast({
                    title: '',
                    description: "Your property has been uploaded successful",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                  })
              }
          }).catch((err)=>{
            console.log(err)
          })
        }
        setissubmitting(false)
      },10000)
      //exit out of listing
      
    }
 return (
      <>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
              <ModalHeader>
                <Center>
                  <Text>Add new Property</Text>
                </Center>
              </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {issubmitting ? 
                <Center >
                  <Loading />
                </Center>
                :
              
              <Flex flexDir="column" width="100%">
                <Steps activeStep={activeStep} orientation={'vertical'}>
                  <Step label={"Initials"} key={1}>
                      <Initials setname={setname} setmobile={setmobile}/>
                    </Step>
                    <Step label={"House details"} key={2}>
                      <HouseDetails setprice={setprice} setsize={setsize} settype={settype}/>
                    </Step>
                    <Step label={"House location"} key={3}>
                      <HouseLocation setschool={setschool} setarea={setarea} setlocation={setlocation}/>
                    </Step>
                    <Step label={"House description"} key={4}>
                      <HouseDescription setdescription={setdescription} setamenities={setamenities} setpolicies={setpolicies}/>
                    </Step>
                    <Step label={"House Images"} key={5}>
                      <HouseImages setimage1={setimage1}/>
                      <Container p='1' mt='2'>
                      <FormLabel>Use referrer code(Leave blank if none)</FormLabel>
                      <Input type='text' placeholder='referrer code' required onChange={((e)=>{setcode(e.target.value)})}/>
                      </Container>
                    </Step>
                </Steps>
                {access === true?
                  
                  <Flex gap='2' mt='2' direction={'column'}>
                      <Button bg='#ffa31a' color='#fff'  onClick={HandleSubmit}>Add Property</Button>
                      <Button bg='#eee' color='red' border='1px solid red ' onClick={(()=>{onClose(); router.reload()})}>Cancel</Button>
                  </Flex>
                  :
                <>
                {activeStep === 5 && access === true ? 
                      <Text mb='5' color='red'>You did not fill all the fields Inputs are required </Text>
                      : ''}
                <Flex width="100%" justify="space-between">
                    <Button
                      isDisabled={activeStep === 0}
                      mr={4}
                      onClick={prevStep}
                      bg="grey"
                      color="#fff"
                    >
                      Prev
                    </Button>
                    <Button bg='#212222' color='#fff' onClick={(()=>{

                      if(activeStep === 5){
                        setaccess(true)
                      }
                      nextStep()
                    })}>
                      {activeStep < 6 && activeStep === 5  ? 'Finish' : 'Next'}
                    </Button>
                  </Flex>
                  </>
                }
              </Flex>
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

const Initials=({setmobile,setname})=>{

  return(
      <FormControl isRequired>
        <FormLabel>Name of the Property</FormLabel>
        <Input type='text' variant='filled' placeholder='e.g Keja Homes' required onChange={((e)=>{setname(e.target.value)})}/>
        <FormLabel>Contacts</FormLabel>
        <Input type='tel' variant='filled' placeholder='e.g +254700111222' required onChange={((e)=>{setmobile(e.target.value)})}/>
      </FormControl>
    )
}

const HouseDetails=({setprice,setsize,settype})=>{

  return(
      <FormControl isRequired>
      <FormLabel>Type of apartments</FormLabel>
        <Select variant='filled' placeholder='Property Type'  required onChange={((e)=>{settype(e.target.value)})}>
          <option value='bedsitter'>Bedsitter</option>
          <option value='single'>Single</option>
          <option value='hostel'>Hostel</option>
          <option value='onebedroom'>One-Bedroom</option>
          <option value='twobedroom'>Two-Bedroom</option>
          <option value='threebedroom'>Three-Bedroom</option>
        </Select>
        <FormLabel>Price of each Apartment</FormLabel>
        <Input type='number' variant='filled' placeholder='Price of apartment per month' required onChange={((e)=>{setprice(e.target.value)})}/>
        <FormLabel>Size of each Apartment in square feet</FormLabel>
        <Input type='number' variant='filled' placeholder='Approximate size of house in square feet' required onChange={((e)=>{setsize(e.target.value)})}/>       
      </FormControl>
      
    )
}

const HouseLocation=({setlocation,setschool,setarea})=>{
  return(
      <FormControl isRequired>
        <FormLabel>Nearest School/Institution your Apartment is in</FormLabel>
        <Select variant='filled' placeholder='Nearest School Your House is in'  required onChange={((e)=>{setschool(e.target.value)})}>
          <option value='jkuat'>Jomo Kenyatta University of Agriculture and Technology</option>
          <option value='ku'>Kenyatta University</option>
        </Select>
        <FormLabel>Area your apartment is located:</FormLabel>
        <Select variant='filled' placeholder='Area'  required onChange={((e)=>{setarea(e.target.value)})}>
          <option value='gate A'>Gate A</option>
          <option value='gate B'>Gate B</option>
          <option value='gate C'>Gate C</option>
          <option value='gate D'>Gate D</option>
          <option value='gate E'>Gate E</option>
          <option value='Gachororo'>Gachororo</option>
        </Select>
        <FormLabel>Link to your physical location of your property</FormLabel>
        <Input type='text' variant='filled' placeholder='Paste Link to your apartment' required onChange={((e)=>{setlocation(e.target.value)})}/>
      </FormControl>
    )
}

const HouseDescription=({setdescription,setamenities,setpolicies})=>{
  return(
      <FormControl isRequired>
        <FormLabel>Property description</FormLabel>
        <Textarea placeholder='Give a description that will attract tenants to your apartment' required  onChange={((e)=>{setdescription(e.target.value)})}/>
        <FormLabel>Property Amenities(Select all that apply)</FormLabel>
        <Textarea placeholder='i.e What to your property offers e.g WIFI, CCTV, Parking' required onChange={((e)=>{setamenities(e.target.value)})}/>
        <FormLabel>Apartment Policies</FormLabel>
        <Textarea placeholder='Policies or Rules of the apartment' required onChange={((e)=>{setpolicies(e.target.value)})}/>
      </FormControl>
    )
}

const HouseImages=({setimage1})=>{
  const [active,setActive] = useState(true);

  return(
      <FormControl isRequired>
        {active ?
                        <Flex direction='column'>
                            <Text fontSize='14px' m='10px 0'>We recommend Uploading quality images of the house with enough lighting.</Text>
                            <Text fontSize='14px' m='10px 0'>You can Select Multiple Images for this listing.</Text>
                            <Input placeholder="You can Select Multiple Images for this listing" type='file' accept='.jpg,.jpeg,.png' variant='filled' required onChange={((e)=>{setimage1(e.target.files)})} multiple/>
                        </Flex> 
                        :
                          <Button onClick={(()=>{setActive(true)})} bg='#eee'> <PhotoCamera/> Upload Images</Button>
                      }
      </FormControl>
    )
}