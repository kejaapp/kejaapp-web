import { 
    Heading,
    Flex,
    Text,
    Center,Stack
 } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import styles from '../../styles/Home.module.css'
import axios from 'axios'

const OurNumbers=[
    {
        id:'1',
        stats:'156',
        title:'Served Students'
    },
    {
        id:'2',
        stats:'13 ',
        title:'Flats Listed'
    },
    {
        id:'3',
        stats:'1',
        title:'Institutions currently in'
    },
]

const features=[
    {
        id:'1',
        title:'Search Schools',
        content:'Search your college/University to find housing around your school.'
    },
    {
        id:'2',
        title:'Rate Houses',
        content:'Leave a review for peers to see what the houses offers.'
    },
    {
        id:'3',
        title:'Share Experiences',
        content:'Connect and join with fellow students on Campus living.'
    },
]


export default function About(){
    const [sizestate, setSizeState] = useState(false);
    const [size, setSize] = useState(500);
    if (typeof window !== 'undefined') {
        //console.log(typeof(size))
      }
    useEffect(()=>{
        try{
            setSize(window.innerWidth)
            if(size >= 400){
                setSizeState(false);
            }else{
                setSizeState(true)
            }
        }catch(err){
            console.log(err)
        }
        
        
    },[size])
    
    return(
        <StyledDivContainer className={styles.mobileresp}>
                <Flex textAlign='left' direction='column' w='100%' >
                    <StyledHeading>
                        Who we are
                    </StyledHeading>
                    <Stack>
                    <Text fontSize='20px' textAlign='left' w='70%' mr='auto' >
                             Keja. app is campus based house hunting platform tuned to help students find apartments
                        around institutions with ease.
                        
                    </Text>
                    </Stack> 
                </Flex>
                <Flex textAlign='right' direction='column' w='100%' mt='4' >
                    <StyledHeading>
                        What we do?
                    </StyledHeading>
                    <Stack>
                    <Text fontSize='20px' textAlign='right' w='70%' ml='auto'>
                            Keja.app aims to provide an extensive list of apartments around institutions to equip students
                            with comprehensive information to which houses offer the most advantageous options that also sideLine 
                            with their academic, social, economic and extracurricular goals.
                    </Text>
                    </Stack> 
                </Flex> 
                    <Center w='100%' mt='5'>
                        <StyledSlider className={styles.scrollbar}>
                            {features.map((features)=>{
                                return(
                                    <StyledDiv key={features.id}>
                                        <Item  features={features}/>
                                    </StyledDiv>
                                )
                            })}
                        </StyledSlider>
                    </Center>  
        </StyledDivContainer>
    )
}
const Item=({features})=>{
    return(
        <Flex borderRadius='5px' textAlign='center' align='center' direction='column' p='10px' m='0 10px'  h='200px' w='225px' key={features.id}>
            <Heading as='h5' fontSize='20px' color="#000" fontFamily='Poppins-bold' mb='10px' textDecoration=' underline 5px solid #ffa31a'>{features.title}</Heading>
            <Center w='100%'>
                <Text fontSize='16px' >{features.content}</Text>
            </Center> 
        </Flex>
    )
}

const StyledDivContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    color: #212222;
    padding: 10% 5%;
`
const StyledHeading = styled.h1`
    font-size: 32px;
    width: 100%;
    color: #ffa31a;
    margin-top: 10px;
    text-decoration: 2px solid underline #212222;
    font-weight: bold

`

const StyledText = styled.p`
    font-size: 18px;
    width: 60%;
`
const StyledDiv = styled.div`
    box-shadow:
  0px 0px 1.2px rgba(0, 0, 0, 0.019),
  0px 0px 2.7px rgba(0, 0, 0, 0.028),
  0px 0px 4.6px rgba(0, 0, 0, 0.034),
  0px 0px 6.9px rgba(0, 0, 0, 0.04),
  0px 0px 10px rgba(0, 0, 0, 0.045),
  0px 0px 14.2px rgba(0, 0, 0, 0.05),
  0px 0px 20.1px rgba(0, 0, 0, 0.056),
  0px 0px 29.2px rgba(0, 0, 0, 0.062),
  0px 0px 45px rgba(0, 0, 0, 0.071),
  0px 0px 80px rgba(0, 0, 0, 0.09)
;


    border-radius: 10px;
    margin: 10px
`
const StyledSlider = styled.div`
    display: flex;
    overflow: auto;
    padding:10px;
    margin: 10px; 
          
`