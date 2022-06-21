import { Center, Flex,Text,Button } from '@chakra-ui/react'
import React from 'react'
import styled from 'styled-components'
import styles from '../../styles/Home.module.css'

export default function StudSec(){
    return(
        <Center>
            <Flex justify='space-around' gap='6' className={styles.mobileresp}>
                <Flex direction='column' p='4'>
                    <StyledHeading>
                        Earn or become an Ambassador
                    </StyledHeading>
                    <Text>
                        Earn by listing apartments or bringing on-board
                        apartments around Institutions.
                    </Text>
                    <Text>
                        Become an Ambassador, and help us bring 
                        Keja to students. 
                    </Text>
                </Flex>
                <Center w='100%' m='0'>
                    <Flex direction='column' gap='8' w='95%'>
                        <Button bg='#ffa31a' borderRadius='999px'>
                            Start Earning
                        </Button>
                        <Button bg='#212222' color='#ffffff' borderRadius='999px' >
                            Become an Ambassador
                        </Button>
                    </Flex>
                </Center>
            </Flex>
        </Center>
    )
}

const StyledHeading = styled.h1`
    font-size: clamp(40px, 2.5vw, 72px);
    font-family: Poppins-bold; 
    text-decoration: underline #ffa31a;
`