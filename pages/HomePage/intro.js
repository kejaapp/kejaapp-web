import React from 'react';
import { 
    Flex,
    Center,
    Text,
    Image,
} from '@chakra-ui/react';
import styled from 'styled-components';
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';

import {ArrowForward }from '@mui/icons-material';
// 1. Import the utilities
import { extendTheme } from '@chakra-ui/react'

// 2. Update the breakpoints as key-value pairs
const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1536px',
}

// 3. Extend the theme
const theme = extendTheme({ breakpoints })

export default function Intro(){
    const router = useRouter();
    return(
        <StyledDiv>
            <Center w='100%' h='70%'>
                        <Flex direction='column' p='2'>
                            <StyledHeading className={styles.fadeInUp}>
                                Find the right home
                            </StyledHeading>
                            <Text fontFamily='Poppins-regular' w={{sm:'90%',lg:'400px'}} mt='20px' fontSize={{sm:'18px',lg:'24px'}} >
                                We help students get access to apartments around their institutions & colleges, helping them make the right choice
                                in finding their next home.
                            </Text>
                            <Flex borderRadius='999px' p='1' mt='10' bg='#ffa31a'  w='150px' align='center' > 
                                <Text borderRadius='999px' fontFamily='Poppins-bold' p='8px' onClick={(()=>router.push('explore'))} >
                                    Get Started
                                </Text>
                                    <ArrowForward />
                            </Flex>
                        </Flex>  
                <Image src='https://img.freepik.com/free-photo/afro-man-taking-selfies-with-phone_58466-16301.jpg?w=360&t=st=1656320965~exp=1656321565~hmac=16bed481e636a24a23f05b4b7d7adb66ae4e4bafa5c8f38a0a4879f5de12be10' alt='img'
                    w='50%' h='80%'  margin='10px' objectFit='cover' objectPosition='35% 50%' borderRadius='20px' boxShadow='dark-lg' />
            </Center>
        </StyledDiv>
    )
}

const StyledHeading = styled.h1`
    font-size: clamp(36px, 2.5vw, 64px);
    font-family: Poppins-bold; 
`
const StyledDiv= styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
`
