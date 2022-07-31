import React from 'react';
import { 
    Flex,
    Center,
    Text,
    Image,
    Button,
    Container
} from '@chakra-ui/react';
import styled from 'styled-components';
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';
import {ArrowForward }from '@mui/icons-material';

export default function Intro(){
    const router = useRouter();
    return(
        <StyledDiv >
            <Center w='60%' h='100%'>
                        <Flex direction='column' p='2' bg='rgb(0,0,0,0.5)' m='5' borderRadius='5'>
                            
                            <Text className={styles.fadeInUp} color='#fff' fontFamily='Poppins-bold' w={'100%'} mt='10px' mb='10%' fontSize={'24px'} >
                                Get access to a list of houses fast, easy and at a click away. <span style={{textDecoration:"underline 1px solid #ffa31a",fontFamily:"Poppins-bold"}}>No more walking</span> , <span style={{textDecoration:"underline 2px solid #ffa31a",fontFamily:"Poppins-bold"}}>No more hustle</span> , <span style={{textDecoration:"underline 2px solid #ffa31a",fontFamily:"Poppins-bold"}}>no more extra & unnecessary fees</span> 
                                
                            </Text>
                            <Button bg='#ffa31a' onClick={(()=>router.push('explore/all'))}> 
                                    Get Started <ArrowForward />
                            </Button>
                        </Flex>
            </Center>
            <Container flex='1'/>
            
        </StyledDiv>
    )
}

const StyledHeading = styled.h1`
    font-size: 48px;
    font-family: Poppins-bold; 
    color: #ffa31a
`
const StyledDiv= styled.div`
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background-image: url("https://img.freepik.com/free-photo/afro-man-taking-selfies-with-phone_58466-16301.jpg?w=360&t=st=1656320965~exp=1656321565~hmac=16bed481e636a24a23f05b4b7d7adb66ae4e4bafa5c8f38a0a4879f5de12be10");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover
`

