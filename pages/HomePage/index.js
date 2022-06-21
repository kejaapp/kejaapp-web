import React from 'react';
import styled from "styled-components";
import Filter from "./filter";
import Intro from   "./intro";
import About from './about';
import School from './school';
import StudSec from './studSec';
import Review from './Review';

import {Room,Instagram,Twitter} from '@mui/icons-material';

import {Flex,Text,Center} from '@chakra-ui/react'


export default function Index(){
    return(
        <StyledContainer >
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
                <Footer/>
            </StyledSection>
        </StyledContainer>
    )
}

const Footer=()=>{
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
                    <Instagram />
                    <Twitter />
                </Flex>
            </Center>
            <Center>
                <Flex gap='2' >
                    <Text fontFamily='Poppins-bold' fontSize='sm'>
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
    height:             99vh;
    width:              99vw;
    justify-content:    center;
    align-items:        center;
    scroll-snap-align:  center;
    display:            flex;
    animation:          3s ease-in;
    flex-direction: column
`
const StyledContainer = styled.div`
    height:100vh;
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
`
