import React from 'react';
import styles from '../styles/Home.module.css'
import {
    Flex,
    Image,
    Spacer,
    Text,
    Button,
    Input,
    InputGroup,
    InputRightElement,
    Stack,
} from '@chakra-ui/react';
import {Share}from '@mui/icons-material';
import { Carousel } from 'antd';
import styled from 'styled-components';
import 'antd/dist/antd.css'

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
    return(
        <>
            {/* Image section */}
            <Flex>
                {/* main -70% */}
                <Stack className={styles.boxMainImageContainer}>
                    <Carousel autoplay style={{margin:'0',}}>
                        {image.map((item)=>{
                            return(
                                    <Image h='60vh' w='100%' objectFit={'cover'} borderRadius='10px' src={item.img} />
                                    )
                                })}
                    </Carousel>
                </Stack>
                <Spacer />
                <Flex className={styles.boxSideImageContainer} direction='column' gap='2' >
                    <Image h='60%' w='100%' objectFit={'cover'} borderRadius='10px' src='https://a0.muscache.com/im/pictures/a003c1a8-0182-4b39-9e48-c6e0be6cbe11.jpg?im_w=320' alt='school photo' />
                    <Flex justify='space-around' height={'40%'}>
                        <Image h='100%' w='48%' objectFit={'cover'} borderRadius='10px' src='https://a0.muscache.com/im/pictures/a003c1a8-0182-4b39-9e48-c6e0be6cbe11.jpg?im_w=320' alt='school photo' />
                        <Image h='100%' w='48%' objectFit={'cover'} borderRadius='10px' src='https://a0.muscache.com/im/pictures/a003c1a8-0182-4b39-9e48-c6e0be6cbe11.jpg?im_w=320' alt='school photo' />
                    </Flex>    
                </Flex>
            </Flex>
            {/* Info Section */}
            <Flex className={styles.infoSection}>
                {/* MAin info sector 70%*/}
                <Flex className={styles.infoMainSection}>
                    <Flex direction="column" w='100%' p='4'>
                        <Flex direction={'column'} gap='0.4' borderBottom={'1px solid #212222'} p='10px 0px'>
                            <Text  mb='0' fontSize='2xl' fontFamily={'Poppins-bold'}>Zawadi Apartments</Text>
                            <Text  mb='0' fontSize='l' fontFamily={'Poppins-bold'}>Ksh 6500/month</Text>
                            <Text f mb='0' > <span style={{fontFamily:"Poppins-bold"}}>School:</span> Jomo Kenyatta University of agriculture and technology</Text>
                            <Text mb='0' ><span style={{fontFamily:"Poppins-bold"}}>Type:</span> Bedsitter</Text>
                            <Text mb='0' ><span style={{fontFamily:"Poppins-bold"}}>Area:</span> Gate C</Text>
                            <Text mb='0' ><span style={{fontFamily:"Poppins-bold"}}>Size:</span> 1800sqt</Text>
                            <Flex gap='4'>
                                <Button borderRadius={'0'} bg='#ffa31a' color='#fff' fontFamily={'Poppins-bold'}>
                                    Contact Agent
                                </Button>
                                <Button borderRadius={'0'} bg='#ffa31a' color='#fff' fontFamily={'Poppins-bold'}>
                                    Share <Share style={{color:"#000"}}/>
                                </Button>
                            </Flex>
                        </Flex>
                        <Flex direction={'column'} gap='0.4' borderBottom={'1px solid #212222'} p='10px 0px'>
                            <Text mb='0' fontSize='l' fontFamily={'Poppins-bold'}>Description</Text>
                            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid.</Text>
                        </Flex>
                        <Flex direction={'column'} gap='0.4' borderBottom={'1px solid #212222'} p='10px 0px'>
                            <Text mb='0' fontSize='l' fontFamily={'Poppins-bold'}>What we have</Text>
                            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid.</Text>
                        </Flex>
                        <Flex direction={'column'} gap='0.4' borderBottom={'1px solid #212222'} p='10px 0px'>
                            <Text mb='0' fontSize='l' fontFamily={'Poppins-bold'}>Policies</Text>
                            <Text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
                                obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
                                nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,
                                tenetur error, harum nesciunt ipsum debitis quas aliquid.</Text>
                        </Flex>
                    </Flex>
                </Flex>
                {/* Contact sector  30%*/}
                <Flex direction='column' className={styles.infoSideSection}>
                    <Flex direction='column' m='2'>
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
                    <Flex p='2'>
                        <Flex>

                        </Flex>
                        <StyledSlider className={styles.scrollbar}>
                            {reviews.map((reviews)=>{
                                return(
                                    <StyledDiv key={reviews.id}>
                                        <Item  reviews={reviews}/>
                                    </StyledDiv>
                                )
                            })}
                        </StyledSlider>
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