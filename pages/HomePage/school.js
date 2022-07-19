import React from 'react';
import { Flex, Text,Image, Heading,Center, Spacer, Button } from '@chakra-ui/react';
import {Home} from '@mui/icons-material';
import styled from 'styled-components'
import styles from '../../styles/Home.module.css'
import {useRouter} from 'next/router'

const school = [
    {   
        id:'1',
        name:'Jomo Kenyatta University of Agriculture and technology',
        flats: 10,
        area:'Juja,Kiambu'
    },
    // {
    //     id:'2',
    //     name:'Kenyatta University',
    //     flats:50,
    //     area:'Ruiru,Kiambu'
    // },
    // {
    //     id:'3',
    //     name:'Mount Kenya University',
    //     flats:40,
    //     area:'Thika,Kiambu'
    // },
    // {
    //     id:'4',
    //     name:'University of Nairobi',
    //     flats:20,
    //     area:'Nairobi,Nairobi'
    // },
]
export default function School(){
    const router = useRouter();
    return(
        <StyledContainer>

            <Flex direction='column' w='100%'>
                <Center>
                    <Flex direction='column' textAlign={'center'}>
                    <StyledHeading >
                        Institutions
                    </StyledHeading>
                    <Text>Want to get your school to our platform? - <span style={{color:'#ffa31a'}}>contact us</span></Text>
                    </Flex>

                </Center>
                <Center m='auto' w='100%'>
                    <StyledSlider className={styles.scrollbar}>
                        {school.map((item)=>{
                            return(
                                <StyledDiv key={item.id}>
                                    <Item  item={item}/>                         
                                </StyledDiv>
                            )
                        })}
                    </StyledSlider>
                </Center>
                <Center mt='20px'>
                    <Button bg='#ffa31a' onClick={(()=>{router.push('explore/all')})}>
                        Explore More
                    </Button>
                </Center>
            </Flex>
        </StyledContainer>

    )
}

const Item=({item})=>{
    return(
        <Flex direction='column' w='325px' h='300px' >
            <Image h='250px' w='325px' objectFit={'cover'} borderRadius='10px' src='/JKUAT.png'/>
            <Text fontFamily='Poppins-bold' fontSize='md' noOfLines={1} >
                    {item.name}
                </Text>
            <Text fontSize='md' p='1'>
                {item.area}
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
    flex-direction: column;
    width: 325px;
    height: 300px;
    border-radius: 10px;
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
    white-space:nowrap;
          
`
const StyledContainer= styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 2.5%;
`