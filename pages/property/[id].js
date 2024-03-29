import React,{useEffect,useState} from 'react';
import styles from '../../styles/Home.module.css'
import {
    Flex,
    Spacer,
    Image,
    Text,
    Button,
    Input,
    InputGroup,
    Stack,
    Textarea,
    useToast,
} from '@chakra-ui/react';
import {Share,Flag}from '@mui/icons-material';
import { Carousel} from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css'
import axios from 'axios';
import {useRouter} from  'next/router';
import { RWebShare } from "react-web-share";
import {ReportListingModal} from '../../components/modals/ReportListingModal';
import { AddReviewModal } from '../../components/modals/addReviewModal';
import {AccountCircle} from '@mui/icons-material';
import Loading from '../../components/loading.js'
import Cookies from 'universal-cookie';
import jwt_decode from "jwt-decode";

export default function PropertyView(){
    const [data,setData]=useState([])
    const router = useRouter();
    const [isreportingModalvisible,setisreportingModalvisible]=useState(false);
    const [isaddingreviewModalvisible,setisaddingreviewModalvisible]=useState(false);
    const [name,setName]=useState('');
    const [body,setBody]=useState('');
    const [mobile,setMobile]=useState('');
    const [email,setEmail]=useState('');
    const [isfetching,setisfetching]=useState(false);

    const {id} = router.query;
    //console.log(router.query);
    // console.log(id);https://keja--app.herokuapp.com
    const cookies = new Cookies();
    let token = cookies.get('usertoken');

    const getPropertyid=async()=>{
        setisfetching(true)
        if(id && id !== undefined){
                //console.log(`started with ${id}`)
                setisfetching(true)
                try{
                   await axios.post('https://keja--app.herokuapp.com/api/getproperty',{
                        id
                    }).then((res)=>{
                       setData(res.data)
                        setisfetching(false)
                    }).catch((err)=>{
                        console.log(err)
                    })
                }catch(err){
                    console.log(err)
                }    
            } 

    }
    useEffect(()=>{
        setTimeout(()=>{
            getPropertyid()
            getRecommendProperties()
        },3000)
        //console.log('loading')
        if(token){
           let decoded = jwt_decode(token);
          //console.log(decoded.id);
            setEmail(decoded.email) 
        }
        return setisfetching(false)
        
    },[id]);

    const images = data?.images;
    const reviews = data?.reviews
    //console.log(data)
    
    
    

    const request = {
        name,
        email,
        mobile,
        body,
        Hid:id,
        date:new Date()
    }
  const toast = useToast()
    const BookApartMent=()=>{
        
        //console.log(request)
        try{
            axios.post('https://keja--app.herokuapp.com/api/bookapartment',{
                request
            }).then((res)=>{
                setData(res.data)
                toast({
                    title: res.data,
                    status: 'success',
                    isClosable: true,
                  })
            }).catch((err)=>{
                console.log(err)
            })
        }catch(err){
            console.log(err)
        }
    }

    const [recData, setrecData]=useState([])
    const param = {
        school:data?.school,
        type:data?.type
    }
//https://keja--app.herokuapp.com
    const getRecommendProperties=async(query)=>{
        try{
            await axios.post('https://keja--app.herokuapp.com/api/recommendproperty',{
                param
            }).then((res)=>{
                console.log(res.data)
                setTimeout(()=>{
                    setrecData(res.data)
                },4000)
            }).catch((err)=>{
                console.log(err)
            })
        }catch(err){
            console.log(err)
        }
        
    }
    return(
        <>
        {isfetching ? 
            <Loading />
                :
        
        <>
            {/* Image section */}
            <Flex>
                {/* main -70% */}
                <Stack className={styles.boxMainImageContainer}>
                    <Carousel autoplay style={{height:'',}}>
                        {images?.map((item)=>{
                            return(
                                <div key={item.id}>
                                    <Image h='60vh' w='100%' alt='image' objectFit={'cover'} borderRadius='10px' src={item} />
                                </div>
                                    )
                                })}
                    </Carousel>
                </Stack>
                <Spacer />
                {images?.length === 1 ? null : 
                <Flex className={styles.boxSideImageContainer} direction='column' gap='2' >
                    <Image h='60%' w='100%' objectFit={'cover'} borderRadius='10px' src={images? images[0] : null} alt='image'/>
                    <Flex justify='space-around' height={'40%'}>
                        <Image alt='image' h='100%' w='48%' objectFit={'cover'} borderRadius='10px' src={images? images[1] : null}/>
                        <Image alt='image' h='100%' w='48%' objectFit={'cover'} borderRadius='10px' src={images? images[3] : null}/>
                    </Flex>    
                </Flex>
            }
            </Flex>
            {/* Info Section */}
            <Flex className={styles.infoSection}>
                {/* MAin info sector 70%*/}
                <Flex className={styles.infoMainSection}>
                    <Flex direction="column" w='100%' p='4'>
                        <Flex direction={'column'} gap='0.4' borderBottom={'1px solid #212222'} p='10px 0px'>
                            <Text  mb='3' fontSize='14px' color='grey' fontFamily={'Poppins-bold'}>apartments with a verified tag have been reviewed and accepted by our company policy </Text>
                            <Flex align='center' justify={'space-between'}>
                                <Text  mb='0' fontSize='2xl' fontFamily={'Poppins-bold'}>{data?.name}</Text>
                                <Text p='1' borderRadius={'5'} bg='#eee' border='1px solid #ffa31a' fontFamily={'Poppins-bold'}>{data?.verified ? 'verified' : 'unverified'}</Text>
                            </Flex>
                            <Text  mb='0' fontSize='l'><span style={{fontFamily:"Poppins-bold"}}>Monthly rent:</span>Ksh {data?.price}</Text>
                            <Text f mb='0' > <span style={{fontFamily:"Poppins-bold"}}>School:</span> {data?.school}</Text>
                            <Text mb='0' ><span style={{fontFamily:"Poppins-bold"}}>Property Type:</span> {data?.type}</Text>
                            <Text mb='0' ><span style={{fontFamily:"Poppins-bold"}}>Area:</span> {data?.area}</Text>
                            <Text mb='0' ><span style={{fontFamily:"Poppins-bold"}}>Size:</span> {data?.size}sq.ft</Text>
                           
                            
                            <Flex gap='4' mt='3'>
                                <Button borderRadius={'0'} bg='#ffa31a' fontFamily={'Poppins-bold'}>
                                    <a style={{color:'#fff'}}href={`tel:${data?.mobile}`}>Contact Agent</a>
                                </Button>
                                <RWebShare
                                data={{
                                text: 'Click to checkout this amazing house',
                                url: ``,
                                title: `${data?.name}`,
                                }}
                                onClick={() => console.log("shared successfully!")}
                                >
                                    <Button borderRadius={'0'} bg='#ffa31a' color='#fff' fontFamily={'Poppins-bold'}>
                                        Share <Share style={{color:"#000"}}/>
                                    </Button>
                                </RWebShare>
                            </Flex>
                        </Flex>
                        <Flex direction={'column'} gap='0.4' borderBottom={'1px solid #212222'} p='10px 0px'>
                            <Text mb='0' fontSize='l' fontFamily={'Poppins-bold'}>Description</Text>
                            <Text>{data?.description}</Text>
                        </Flex>
                        <Flex direction={'column'} gap='0.4' borderBottom={'1px solid #212222'} p='10px 0px'>
                            <Text mb='0' fontSize='l' fontFamily={'Poppins-bold'}>What we have</Text>
                            <Text>{data?.amenities}</Text>
                        </Flex>
                        <Flex direction={'column'} gap='0.4' borderBottom={'1px solid #212222'} p='10px 0px'>
                            <Text mb='0' fontSize='l' fontFamily={'Poppins-bold'}>Policies</Text>
                            <Text>{data?.policies}</Text>
                        </Flex>
                        {
                        recData?.length === 0 ? 
                        <>
                            <Text m='0 10px'> We could not find an apartment to recommend to you yet.</Text> 
                        </>
                        :
                        <Flex direction='column' gap='3'>
                            <Text m='0px' fontFamily='Poppins-bold' fontSize='16px' textDecoration='underline solid 2px #ffa31a'> We have more options for you </Text>
                            <StyledSlider className={styles.scrollbar} style={{padding:'10px 0'}}>
                                {recData?.map((item)=>{
                                    return(
                                        <StyledDiv key={item.id}>
                                            <Property  item={item}/>
                                        </StyledDiv>
                                    )
                                })}
                            </StyledSlider>
                            
                        </Flex>
                        
                    }
                    </Flex>
                </Flex>
                
                {/* Contact sector  30%*/}
                <Flex direction='column' className={styles.infoSideSection}>

                    <Flex direction='column' m='2' borderTop='1px solid #212222'>
                        <Text mb='0'>Need help getting this apartment? We can help you.</Text>
                        <Text mb='1' color='#ffa31a'>Contact Us by Filling the form below.</Text>
                        <Stack spacing={4} bg='#eeeeee' p='2' borderRadius='5px' boxShadow={'lg'}>
                            <InputGroup>
                                <Input type='text' onChange={((e)=>{setName(e.target.value)})} placeholder='Name' variant='flushed'/>
                            </InputGroup>
                            <InputGroup>
                                <Input type='tel' onChange={((e)=>{setMobile(e.target.value)})} placeholder='phone number' variant='flushed'/>
                            </InputGroup>
                            <Textarea placeholder='Any special requests we should consider' maxlength="100" h="100" onChange={((e)=>{setBody(e.target.value)})}/>
                            <Button
                                    mt={4}
                                    bg='#ffa31a'
                                    type='submit'
                                    color='#ffffff'
                                    fontFamily='Poppins-bold'
                                    onClick={BookApartMent}
                                >
                                    Submit Request
                                </Button>
                            </Stack>
                    </Flex>
                    <Flex p='2' direction={'column'} borderTop='1px solid grey' mt='2'>
                    <AddReviewModal isaddingreviewModalvisible={isaddingreviewModalvisible} setisaddingreviewModalvisible={setisaddingreviewModalvisible} id={id}/>
                    <Text fontFamily={'Poppins-bold'} fontSize={'18px'}>Reviews</Text>
                    {
                        reviews?.length === 0 ? 
                        <>
                        <Text> We do not have any reviews for this apartment yet</Text> 
                            <Button mt='2' mb='2'  bg='#ffa31a' 
                                onClick={(()=>{setisaddingreviewModalvisible(true)})}
                                >
                                    Add a review
                                </Button>
                        
                        </>
                        :
                        <Flex direction='column' gap='3'>
                            
                            <StyledSlider className={styles.scrollbar}>
                            {reviews?.slice(0,3).map((reviews)=>{
                                return(
                                    <StyledDiv key={reviews.id}>
                                        <Item  reviews={reviews}/>
                                    </StyledDiv>
                                )
                            })}
                        </StyledSlider>
                        <Button mt='2' mb='2'  bg='#ffa31a' 
                                onClick={(()=>{setisaddingreviewModalvisible(true)})}
                                >
                                    Add a review
                                </Button>
                        </Flex>
                        
                    }
                    <ReportListingModal isreportingModalvisible={isreportingModalvisible} setisreportingModalvisible={setisreportingModalvisible} id={id}/>
                                <Button mt='2'  bg='#e5e5e5' color='red' 
                                onClick={(()=>{setisreportingModalvisible(true)})}
                                >
                                    <Flag /> Report this listing
                                </Button>
                                
                    </Flex>
                </Flex>
            </Flex>
        </>

        }
        </>
    )
}

const Item=({reviews})=>{
    return(
        <Flex p='2' gap='3' borderRadius='10px' direction='column' w='250px' h='200px' bg='#eee' color='#212222'>
            <Flex gap='3'>
                <AccountCircle style={{width:"40px",height:"40px"}}/>
                <Flex direction='column' >
                    <Text mb='0' fontFamily='Poppins-bold' fontSize='12px' w='90%'>
                        {reviews.email}
                    </Text>
                    <Text mb='0' fontSize='12px'>
                        {reviews.school}
                    </Text>
                </Flex>
            </Flex>
            <Text mb='0' fontSize='14px' w='100%' overflow='wrap'>
                {reviews.body}
            </Text>
        </Flex>
    )
}

const Property=({item})=>{
    const images = item?.images;
    const router=useRouter();
    return(
        <Flex position='relative' direction='column' w='200px' h='200px' onClick={(()=>{window.open(`/property/${item._id}`, '_blank');})}>
            <Image zIndex='-1'  w='250px' h='200px' borderRadius='10px' src={images? images[0] : null} alt='property'/>
            <Flex bg='grey' h='45x' p='0px 3px' w='100%' opacity='0.88' borderRadius='0px 0px 10px 10px' direction='column' position={'absolute'} bottom='0px' left='0px' zIndex='1'>
                <Text color='#ffa31a' fontFamily='Poppins-bold' m='0'>
                    Ksh {item.price}
                </Text>
                <Text m='0' fontFamily='Poppins-bold'>
                    {item.area}
                </Text>
            </Flex>
        </Flex>
    )
}

const StyledDiv = styled.div`
    box-shadow:
    2px 10.9px 10px rgba(0, 0, 0, 0.075),
    16px 87px 80px rgba(0, 0, 0, 0.15)
    ;
    display: flex;
    margin: 0 10px;
    border-radius: 10px
`
const StyledHeading = styled.h1`
    font-size: clamp(36px, 2.5vw, 64px);
    font-family: Poppins-bold; 
    text-decoration: underline #ffa31a;
`
const StyledSlider = styled.div`
    display: flex;
    overflow: auto;  
    padding: 10px;        
`