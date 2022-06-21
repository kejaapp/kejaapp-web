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
          <StyledSection inputColor="#fff">
              <Filter/>
          </StyledSection >
          <StyledSection inputColor="#fff">
              <Intro/>
          </StyledSection>
          <StyledSection inputColor="#212222" >
              <About/>
          </StyledSection>
          <StyledSection inputColor="#fff">
              <School/>
          </StyledSection>
          <StyledSection inputColor="#fff">
              <StudSec />
          </StyledSection>
          <StyledSection inputColor="#fff" >
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
  background-color:   ${props => props.inputColor || "#212222"};
  height:             100%;
  width:              100%;
  justify-content:    center;
  align-items:        center;
  scroll-snap-align:  center;
  display:            flex;
  animation:          3s ease-in;
  flex-direction: column;
`
const StyledContainer = styled.div`
  height:100vh;
  width: 100vw;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
`