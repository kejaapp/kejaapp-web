import React from 'react';
import {Button,
        Center,
        Flex,
        Select,
        Text,
        Container,
        Heading,
        Circle,
        Image,
        Box,
    } from "@chakra-ui/react";
import {Search,ArrowDownward }from '@mui/icons-material';
import styled from 'styled-components';
import styles from '../../styles/Home.module.css'
import Header from '../../components/Header'
export default function Filter (){

    return(
        <StyledDiv >
            {/* <Header /> */}
            <Container mt={{base:'20vh',md:'',lg:'25vh'}} >
                <Center mb='10'>
                    <Flex direction='column'>
                        <Heading className={styles.fadeInUp} as='h1' align='center' size='xl' fontFamily='Poppins-bold' textShadow='1px 2px 3px #666'>
                            Usichome fare ukisaka Keja
                        </Heading>
                        <Text size='xs' align='center' fontFamily='Poppins-regular'>
                            Find a home around your institution/school
                        </Text>
                    </Flex>
                </Center>
                <Center margin='2' boxShadow='lg' borderRadius='lg' bg='#eee' h='50px'>
                    <Select p='2' focusBorderColor = "#ffa31a" borderRadius='md' borderRight='1px' margin='2' color='#ffa31a' fontFamily='Poppins-bold' variant='flushed' placeholder='School'>
                        <option value='option1'>Jomo Kenyatta University of Agriculture</option>
                        <option value='option2'>Kenyatta University</option>
                        <option value='option3'>Mount Kenya University</option>
                    </Select>
                    <Select focusBorderColor = "#ffa31a" borderRadius='md' borderRight='1px' margin='2' fontFamily='Poppins-bold' variant='flushed' placeholder='Area'>
                        <option value='option1'>Gate A</option>
                        <option value='option2'>Gate B</option>
                        <option value='option3'>Gate C</option>
                        <option value='option3'>Gate D</option>
                        <option value='option3'>Gate E</option>
                        <option value='option3'>Gachororo</option>
                    </Select>
                    <Select focusBorderColor = "#ffa31a" borderRadius='md' fontFamily='Poppins-bold' variant='flushed' placeholder='Type'>
                        <option value='option1'>Bedsitter</option>
                        <option value='option2'>Single</option>
                        <option value='option3'>Hostel</option>
                        <option value='option3'>One-Bedroom</option>
                        <option value='option3'>Two-Bedroom</option>
                        <option value='option3'>Three-Bedroom</option>
                    </Select>
                    <Button colorScheme='#ffa31a' bg='#ffa31a' h='100%' borderRadius='0' >
                        <Search color='#212222'/>
                    </Button>
                </Center>
                <Center mt='20'>
                        <Text  mt='10' size='md' fontFamily='Poppins-bold'>
                            Scroll to Explore
                        </Text>
                </Center>
                <Center mt='10' > 
                    <Circle bg='#ffa31a' w='40px' h='40px' borderRadius='5px'>
                        <ArrowDownward />
                    </Circle>
                </Center>
            </Container>
        </StyledDiv>
    )                 
}

const StyledDiv= styled.div`
        width: 100%;
        height: 100%;
`
