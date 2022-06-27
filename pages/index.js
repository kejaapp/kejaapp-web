import React from 'react';
import styled from "styled-components";
import Filter from "../pages/HomePage/filter";
import Intro from   "../pages/HomePage/intro";
import About from '../pages/HomePage/about';
import School from '../pages/HomePage/school';
import StudSec from '../pages/HomePage/studSec';
import Review from '../pages/HomePage/Review';

import {Room,Instagram,Twitter} from '@mui/icons-material';
import {Flex,Text,Center} from '@chakra-ui/react';
import styles from '../styles/Home.module.css'

export default function Index(){
  return(
    <>
      <StyledContainer className={styles.scrollbar} >
        <StyledSection>
            <Filter/>
        </StyledSection>
        <StyledSection>
            <Intro/>
        </StyledSection>
        <StyledSection>
            <About/>
        </StyledSection>
        <StyledSection>
            <School/>
        </StyledSection>
        <StyledSection>
            <StudSec />
        </StyledSection>
        <StyledSection>
            <Review />
        </StyledSection>
      </StyledContainer>
    </>
  )
}

export const Footer=()=>{
  return(
      <Flex direction='column' mt='20px'>
          <Center>
              <Flex>
                  <Room style={{color:'#ffa31a'}}/>
                  <Text fontFamily='Poppins-bold'>keja.app</Text>
              </Flex>
          </Center>
          <Center m='10px'>
              <Flex gap='3'>
                <a href="https://www.instagram.com/keja.app" 
                    target="_blank"
                    rel="noopener noreferrer">
                        <Instagram />
                </a >
                  <Twitter />
              </Flex>
          </Center>
          <Center>
              <Flex gap='2' >
                  <Text fontFamily='Poppins-bold' fontSize='sm' onClick={() =>
                                    (window.location = `/help/listing`)
                                }>
                      Help
                  </Text>
                  <Text fontFamily='Poppins-bold' fontSize='sm'>
                      Terms&Conditions
                  </Text>
                  <Text fontFamily='Poppins-bold' fontSize='sm'>
                      Privacy Policy
                  </Text>
              </Flex>
          </Center>
          <Center>
              <Flex>
                  <Text>&copy;</Text>
                  <Text fontSize='sm'>2021.All rights reserved</Text>
              </Flex>
          </Center>
      </Flex>
  )
}

//Styled components 
const StyledSection = styled.div`
  scroll-snap-align:  center;
  animation:          5s ease-in;
  height: 100%;
`
const StyledContainer = styled.div`
  height:100vh;
  width: 100vw;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
`