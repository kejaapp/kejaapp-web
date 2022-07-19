import React from 'react';
import styled from "styled-components";

import {Room,Instagram,Twitter} from '@mui/icons-material';

import {Flex,Text,Center,Heading} from '@chakra-ui/react'
import Script from 'next/script'

export default function Footer(){
    return(
        <Flex direction='column' mt='20px'>
            <Center>
                <Heading fontSize='20px' fontFamily='Poppins-bold'>
                  keja<span style={{color:'#ffa31a'}}>.app</span>
                  <Script src="https://cdn.lordicon.com/xdjxvujz.js"></Script>
                    <lord-icon
 src="https://cdn.lordicon.com/zzcjjxew.json"
    colors="primary:#212222,secondary:#ffa31a"
                                style={{width:'35px',height:"35px",}}
                                >
                            </lord-icon>
                </Heading>
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
    overflow-y: scroll;
`