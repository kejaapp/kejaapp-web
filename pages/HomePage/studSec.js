import { Center, Flex,Text,Button } from '@chakra-ui/react'
import React from 'react'
import styled from 'styled-components'
import styles from '../../styles/Home.module.css'

export default function StudSec(){
    return(
        <StyledDiv  bg='#eeeeee'>
            <Flex justify='space-around' gap='6' className={styles.mobileresp}>
                <Flex direction='column' p='4'>
                    <StyledHeading>
                        Earn or become an Ambassador
                    </StyledHeading>
                    <Text>
                        Earn by referring apartments or bringing on-board
                        apartments around Institutions.
                    </Text>
                    <Text>
                        Become an Ambassador, and help us bring 
                        Keja to students. 
                    </Text>
                </Flex>
                <Center w='100%' m='0'>
                    <Flex direction='column' gap='8' w='95%'>
                        <a href="/help/listing" 
                        target="_blank"
                        rel="noopener noreferrer"> 
                        <Button bg='#ffa31a' color='#fff' borderRadius='999px' w='100%'> 
                        start earning
                        </Button>
                        </a>
                        <Button bg='#212222' color='#ffffff' borderRadius='999px' >
                            <a href="/help/ambassador" 
                                target="_blank"
                                rel="noopener noreferrer" style={{color:'#fff'}}> 
                                Become an Ambassador
                            </a>
                        </Button>
                    </Flex>
                </Center>
            </Flex>
        </StyledDiv>
    )
}

const StyledHeading = styled.h1`
    font-size: clamp(40px, 2.5vw, 72px);
    font-family: Poppins-bold; 
    text-decoration: underline #ffa31a;
`
const StyledDiv= styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #eee;
`