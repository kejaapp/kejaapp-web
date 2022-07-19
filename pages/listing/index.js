import React,{useState,useEffect} from 'react';
import styled from 'styled-components';
import styles from '../../styles/Home.module.css'
import {
    Flex,
    Text,
    Button,
    Center,
    Image,
    useToast
} from '@chakra-ui/react';
import { AddBox, BookmarkAdded, BookmarkBorder, Delete } from '@mui/icons-material';

import { AddNewItem } from '../../components/modals/AddNewPropertyModal';
import { PromoteProperty } from '../../components/modals/PromotePropertyModal';
import { EditProperty } from '../../components/modals/EditPropertyModal';
import { ListingAccountModal } from '../../components/modals/ListingAccountModal';

import axios from 'axios';
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

function Landlords(){
    //modals
    const [isAddNewPropertyModalvisible,setIsAddNewPropertyModalModalVisible]=useState(false);
    
    const [isListingModalvisible,setIsListingModalvisible]=useState(false);
    

    const [active,setActive]=useState(false);
    const [data,setData] = useState([]);
    const [email,setEmail] = useState('')
    const cookies = new Cookies();
    const toast = useToast();
    const login=async()=>{
            let token = cookies.get('usertoken');

            if(token){
                let decoded = jwt_decode(token);
                //console.log(decoded.id);
                setEmail(decoded.email);
            };
            // let email = decoded.email

            console.log(email)
            if(!email){
                return console.log('please provide an email')
            }
            //'https://keja--app.herokuapp.com/api/listinglogin'
            try{
                await axios.post('https://keja--app.herokuapp.com/api/listinglogin',{
                 email
                    }).then((res)=>{
                        if(res.status === 200){
                            // cookies.set('listingstatus', 'active', { path: '/' });
                            toast({
                                title: '',
                                description: "Login Successful",
                                status: 'success',
                                duration: 9000,
                                isClosable: true,
                            });
                        return setActive(true);

                        }
                        return toast({
                            title: 'Log in Failed',
                            description: 'You need to create a listing account to use start listing',
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                          });
                    })
        }catch(err){
            console.log(err)
        }
    }

    const getProperties=async()=>{
        try{
            let email = cookies.get('listingemail');
            await axios.post('https://keja--app.herokuapp.com/api/getlistedproperties',{
                email
            }).then((res)=>{
                //console.log(res.data)
                return setData(res.data)
            })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getProperties();
    },[])
    return(
        <>
        {active ? 
        <Flex direction='column' p='3'>
            <Image src='https://img.freepik.com/free-photo/hand-presenting-model-house-home-loan-campaign_53876-104970.jpg?t=st=1657636442~exp=1657637042~hmac=a1c8c9e89f9dc13505d0f61596848aa491ff59f31c3a84b3106f48100b520882&w=740' h='400px' mb='3' borderRadius={'5'} objectFit={'cover'} alt='cover'/>
            <AddNewItem isAddNewPropertyModalvisible={isAddNewPropertyModalvisible} setIsAddNewPropertyModalModalVisible={setIsAddNewPropertyModalModalVisible}/>
            <Flex gap='3'>
                <Button bg='#212222' flex='1' color='#fff' fontFamily={'Poppins-bold'} onClick={(()=>{setIsAddNewPropertyModalModalVisible(true)})}><AddBox/>Add Property</Button>
                <Button onClick={(()=>setActive(false))} bg='#eee' >Logout</Button>
            </Flex>
            <Flex direction='column' borderTop='1px solid #212222' mt='2'>
                <Text>Listed Apartments</Text>
                {data.length !== 0 ?
                
                    <StyledSlider className={styles.scrollbar}>
                        {data.map((item)=>{
                            return(
                                <StyledDiv key={item.id}>
                                    <Property  item={item} value='promoted' />                         
                                </StyledDiv>
                            )
                        })}
                    </StyledSlider>
                
                :
                <Center p='5'>
                    <Text color='grey'>You have not posted any property yet</Text>
                </Center>
                }
            </Flex>
            <Flex direction='column' borderTop='1px solid #212222' mt='2'>
                <Text>Promoted Apartments</Text>
                <Text fontSize={'12px'} color='grey'>Promote your apartments to rank high in our search sections</Text>
                {data.length !== 0 ?
                    <StyledSlider className={styles.scrollbar}>
                        {data
                        .filter((property)=> property.sponsored === true)
                        .map((item)=>{
                            return(
                                <StyledDiv key={item.id}>
                                    <Property  item={item} value='sponsored'/>                         
                                </StyledDiv>
                            )
                        })}
                    </StyledSlider>
                :
                <Center p='5'>
                    <Text color={'grey'}>You have not promoted any property yet</Text>
                </Center>
                }
                <Flex direction={'column'} borderTop='1px solid #212222' mt='2'>
                    <Text>Contact Support</Text>
                    <Text bg='#ffa31a' w='100px' p='1'>0771712005</Text>
                </Flex>
            </Flex>
        </Flex>
        :
        <Center mt='20vh' p='5'>
            <Flex direction='column' gap='2'>
                    <Text >
                        Welcome, Make your property visible to thousands of students
                    </Text>
                    <a href="/help/listing" 
                        target="_blank"
                        rel="noopener noreferrer"> 
                    <Text fontSize='sm' color='#ffa31a' >Learn more </Text>
                    </a>
                    <ListingAccountModal setActive={setActive} isListingModalvisible={isListingModalvisible} setIsListingModalvisible={setIsListingModalvisible}/>
                    <Button bg='#ffa31a' fontFamily={'Poppins-bold'} color='#fff' onClick={(()=>{setIsListingModalvisible(true)})}>Create a Listing account </Button>
                    <Button bg='#212222' fontFamily={'Poppins-bold'} color='#fff' onClick={login}>Log in</Button>
                </Flex>
        </Center>
        }
        </>
    )
}

export default Landlords;

const Property=({item,value})=>{
    const [isPropertyEditingModalvisible,setisPropertyEditingModalvisible]=useState(false);
    const [isModalvisible,setIsModalVisible]=useState(false);//promote modal
    let id = item._id
    const HandleDelete = async()=>{
        try{
            await axios.post('https://keja--app.herokuapp.com/api/deleteproperty',{
                id
            }).then((res)=>{
                return console.log('deleted')
            }).catch((err)=>{
                console.log(err)
            })
        }catch(err){
            console.log(err)
        }
    }
    return(
        <Flex direction='column' w='200px' position={'relative'}>
            <EditProperty isPropertyEditingModalvisible={isPropertyEditingModalvisible} setisPropertyEditingModalvisible={setisPropertyEditingModalvisible} item={item}/>
            <PromoteProperty isModalvisible={isModalvisible} setIsModalVisible={setIsModalVisible}/>
            <Image h='150px' w='100%' borderRadius='10px' objectFit={'cover'} src={item.images[0]} />
            <Flex position='absolute' top='10px' right={'5px'} direction='column'>
                {item.sponsored === true ? 
                <BookmarkAdded style={{color:'#ffa31a'}}/>
                :
                <BookmarkBorder />
                }
                {value === item.sponsored ? null : 
                    <Delete style={{color:'red',opacity:'0.5'}} onClick={HandleDelete}/>
                }
            </Flex>
            <Flex direction='column' p='1' gap='1'>
                <Text  fontFamily='Poppins-bold' fontSize='14px' noOfLines={1}>
                    {item.name}
                </Text>
                <Text fontSize='10px' >
                    {item.area}
                </Text>
                {item.promoted  === true ? 
                    null
                :
                <Flex direction={'column'}>
                    <Button fontSize='12px' color='#fff' bg='#212222' h='5' m='10px 0' onClick={(()=>{setisPropertyEditingModalvisible(true)})}>Edit property</Button>
                    <Button fontSize='12px' bg='#ffa31a' h='5' onClick={(()=>{setIsModalVisible(true)})}>Promote</Button>
                </Flex>
                
                }
            </Flex>
        </Flex>
    )
}

const StyledHeading = styled.h1`
    font-size: clamp(36px, 2.3vw, 64px);
    font-family: Poppins-bold; 
    width: 100%;
`
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
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    margin: 10px
`