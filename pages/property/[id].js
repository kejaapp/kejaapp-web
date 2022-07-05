import React,{useEffect,useState} from 'react';
import styles from '../../styles/Home.module.css'
import {
    Flex,
    Image,
    Spacer,
    Text,
    Button,
    Input,
    InputGroup,
    Stack,
} from '@chakra-ui/react';
import {Share,Flag}from '@mui/icons-material';
import { Carousel } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css'
import axios from 'axios';
import {useRouter} from  'next/router';
import { RWebShare } from "react-web-share";
import {ReportListingModal} from '../../components/modals/ReportListingModal';

const image = [
    {
        img:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48729525/original/f62e1b1a-d6af-438b-82ce-95c51a4e0ca1.jpeg?im_w=720'
    },
    {
        img:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48729525/original/f62e1b1a-d6af-438b-82ce-95c51a4e0ca1.jpeg?im_w=720'
    },
    {
        img:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48729525/original/f62e1b1a-d6af-438b-82ce-95c51a4e0ca1.jpeg?im_w=720'
    },
    {
        img:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48729525/original/f62e1b1a-d6af-438b-82ce-95c51a4e0ca1.jpeg?im_w=720'
    },
    {
        img:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48729525/original/f62e1b1a-d6af-438b-82ce-95c51a4e0ca1.jpeg?im_w=720'
    }
]

const reviews = [
    {
        id:'1',
        name:'Dennis Sammy',
        profile:'./img2.png',
        school:'Jkuat',
        content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
    },
    {
        id:'2',
        name:'Nyambuzi',
        profile:'./img4.png',
        school:'Jkuat',
        content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
    },
    {
        id:'3',
        name:'JJ Johnson',
        profile:'./img1.png',
        school:'Jkuat',
        content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
    },
]
export default function PropertyView(){
    const [data,setData]=useState([])
    const router = useRouter();
    const [isreportingModalvisible,setisreportingModalvisible]=useState(false);

    const {id} = router.query;
    // console.log(id);
    useEffect(()=>{
        try{
            axios.post('https://keja--app.herokuapp.com/api/getproperty',{
                id
            }).then((res)=>{
                setData(res.data)
            }).catch((err)=>{
                console.log(err)
            })
        }catch(err){

        }
    },[id])
    const images = data?.images;
    
    return(
        <>
            {/* Image section */}
            <Flex>
                {/* main -70% */}
                <Stack className={styles.boxMainImageContainer}>
                    <Carousel autoplay style={{margin:'0',}}>
                        {images?.map((item)=>{
                            return(
                                <div key={item.id}>
                                    <Image h='60vh' w='100%' objectFit={'cover'} borderRadius='10px' src={item} alt='img' />
                                </div>
                                    )
                                })}
                    </Carousel>
                </Stack>
                <Spacer />
                <Flex className={styles.boxSideImageContainer} direction='column' gap='2' >
                    <Image h='30vh' w='100%' objectFit={'cover'} borderRadius='10px' src={images? images[0] : null}/>
                    <Flex justify='space-around' height={'40%'}>
                        <Image h='100%' w='48%' objectFit={'cover'} borderRadius='10px' src={images? images[1] : null}/>
                        <Image h='100%' w='48%' objectFit={'cover'} borderRadius='10px' src={images? images[3] : null}/>
                    </Flex>    
                </Flex>
            </Flex>
            {/* Info Section */}
            <Flex className={styles.infoSection}>
                {/* MAin info sector 70%*/}
                <Flex className={styles.infoMainSection}>
                    <Flex direction="column" w='100%' p='4'>
                        <Flex direction={'column'} gap='0.4' borderBottom={'1px solid #212222'} p='10px 0px'>
                            <Text  mb='0' fontSize='14px' color='#e5e5e5' fontFamily={'Poppins-bold'}>apartments with a verified tag have been reviewed and accepted by our company policy </Text>
                            <Flex align='center' justify={'space-between'}>
                                <Text  mb='0' fontSize='2xl' fontFamily={'Poppins-bold'}>{data?.name}</Text>
                                <Text p='1' borderRadius={'5'} bg='#eee' border='1px solid #ffa31a' fontFamily={'Poppins-bold'}>{data?.verified ? 'verified' : 'unverified'}</Text>
                            </Flex>
                            <Text  mb='0' fontSize='l' fontFamily={'Poppins-bold'}>Ksh {data?.price}</Text>
                            <Text f mb='0' > <span style={{fontFamily:"Poppins-bold"}}>School:</span> {data?.school}</Text>
                            <Text mb='0' ><span style={{fontFamily:"Poppins-bold"}}>Type:</span> {data?.type}</Text>
                            <Text mb='0' ><span style={{fontFamily:"Poppins-bold"}}>Area:</span> {data?.area}</Text>
                            <Text mb='0' ><span style={{fontFamily:"Poppins-bold"}}>Size:</span> {data?.size}sqt</Text>
                            <Text mb='0' ><span style={{fontFamily:"Poppins-bold"}}>Find this apartment:</span> <a href={`https://maps.google.com/?q=${data?.location}`} target="_blank"
                            rel="noopener noreferrer">{data?.location}</a></Text>
                            
                            <Flex gap='4' mt='3'>
                                <Button borderRadius={'0'} bg='#ffa31a' color='#fff' fontFamily={'Poppins-bold'}>
                                    <a href={`tel:${data?.mobile}`}>Contact Agent</a>
                                </Button>
                                <RWebShare
                                data={{
                                text: 'Click to checkout this amazing house',
                                url: `http://localhost:3000/property/${id}`,
                                title: `${data?.name}`,
                                }}
                                onClick={() => console.log("shared successfully!")}
                                >
                                    <Button borderRadius={'0'} bg='#ffa31a' color='#fff' fontFamily={'Poppins-bold'}>
                                        Share <Share style={{color:"#000"}}/>
                                    </Button>
                                </RWebShare>
                            </Flex>
                            <ReportListingModal isreportingModalvisible={isreportingModalvisible} setisreportingModalvisible={setisreportingModalvisible}/>
                                <Button mt='2'  bg='#e5e5e5' color='red' onClick={(()=>{setisreportingModalvisible(true)})}>
                                    <Flag /> Report this listing
                                </Button>
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
                    </Flex>
                </Flex>
                {/* Contact sector  30%*/}
                <Flex direction='column' className={styles.infoSideSection}>
                    <Flex direction='column' m='2' borderTop='1px solid #212222'>
                        <Text mb='0'>Need help getting this apartment?</Text>
                        <Text mb='1'>Contact Us</Text>
                        <Stack spacing={4} bg='#eeeeee' p='2' borderRadius='5px' boxShadow={'lg'}>
                            <InputGroup>
                                <Input type='text' placeholder='Name' variant='flushed'/>
                            </InputGroup>
                            <InputGroup>
                                <Input type='email' placeholder='Email' variant='flushed'/>
                            </InputGroup>
                            <InputGroup>
                                <Input type='tel' placeholder='phone number' variant='flushed'/>
                            </InputGroup>
                            <Button
                                    mt={4}
                                    bg='#ffa31a'
                                    type='submit'
                                    color='#ffffff'
                                    fontFamily='Poppins-bold'
                                >
                                    Submit
                                </Button>
                            </Stack>
                    </Flex>
                    <Flex p='2' direction={'column'} borderTop='1px solid grey' mt='2'>
                    <Text fontFamily={'Poppins-bold'} fontSize={'18px'}>Reviews</Text>
                    {
                        reviews.length !== 0 ? 
                        <Text> We do not have any reviews for this apartment yet</Text> :

                        <StyledSlider className={styles.scrollbar}>
                            {reviews.map((reviews)=>{
                                return(
                                    <StyledDiv key={reviews.id}>
                                        <Item  reviews={reviews}/>
                                    </StyledDiv>
                                )
                            })}
                        </StyledSlider>
                    }
                    </Flex>
                </Flex>
            </Flex>
        </>
    )
}

const Item=({reviews})=>{
    return(
        <Flex p='2' gap='3' borderRadius='10px' direction='column' w='250px' h='200px' bg='#212222' color='#fff'>
            <Flex gap='3'>
                <Image
                    borderRadius='full' 
                    boxSize='40px'
                    src={reviews.profile}
                    alt='profile pic'
                />
                <Flex direction='column' >
                    <Text mb='0' fontFamily='Poppins-bold'>
                        {reviews.name}
                    </Text>
                    <Text mb='0' fontSize='12px'>
                        {reviews.school}
                    </Text>
                </Flex>
            </Flex>
            <Text mb='0' fontSize='14px' w='100%' overflow='wrap'>
                {reviews.content}
            </Text>
        </Flex>
    )
}

const StyledDiv = styled.div`
    box-shadow:
    2px 10.9px 10px rgba(0, 0, 0, 0.075),
    16px 87px 80px rgba(0, 0, 0, 0.15)
    ;
    display: flex;
    margin: 10px
`
const StyledHeading = styled.h1`
    font-size: clamp(36px, 2.5vw, 64px);
    font-family: Poppins-bold; 
    text-decoration: underline #ffa31a;
`
const StyledSlider = styled.div`
    display: flex;
    overflow: auto;
    padding:10px;
    margin: 10px; 
          
`