import React from 'react';
import {Flex,Image,Text,Button,Center} from '@chakra-ui/react'
import styled from 'styled-components';
import styles from '../../styles/Home.module.css'
import {Footer} from '../index'

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
        content:'Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit.Lorem ipsum dolor sit amet consectetur adipisicing elit. '
    },
    {
        id:'3',
        name:'JJ Johnson',
        profile:'./img1.png',
        school:'Jkuat',
        content:'Lorem ipsum dolor sit amet consectetur adipisicing elit. '
    },
]

export default function Review(){
    return(
        <StyledContainer>
            <Flex direction='column' gap='3' w='100%' p='2' h="70vh">
                    <StyledHeading>
                        What student say about us?
                    </StyledHeading>
                <Center w='100%'>
                    <StyledSlider className={styles.scrollbar}>
                        {reviews.map((reviews)=>{
                            return(
                                <StyledDiv key={reviews.id}>
                                    <Item  reviews={reviews}/>
                                </StyledDiv>
                            )
                        })}
                    </StyledSlider>
                </Center>
                <Footer/>
            </Flex>
        </StyledContainer>
    )
}


const Item=({reviews})=>{
    return(
        <Flex p='2' gap='3' borderRadius='10px' direction='column' w='250px' h='250px' bg='#212222' color='#fff'>
            <Flex gap='3'>
                <Image
                    borderRadius='full' 
                    boxSize='40px'
                    src={reviews.profile}
                    alt='pp'
                />
                <Flex direction='column' >
                    <Text fontFamily='Poppins-bold'>
                        {reviews.name}
                    </Text>
                    <Text fontSize='12px'>
                        {reviews.school}
                    </Text>
                </Flex>
            </Flex>
            <Text fontSize='14px' w='100%' overflow='wrap'>
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
const StyledContainer= styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align:center;
        flex-direction: column;
`