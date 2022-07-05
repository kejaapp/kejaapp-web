import { 
    Heading,
    Flex,
    Text,
    Center,
 } from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import styled from 'styled-components'
import styles from '../../styles/Home.module.css'

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
                    <StyledHeading>
                        About Us
                    </StyledHeading>
                        <StyledText  >
                            Keja.app aims to provide an extensive list of apartments around institutions to equip students
                            with comprehensive information to which houses offer the most advantageous options that also sideLine 
                            with their academic, social, economic and extracurricular goals.
                        </StyledText>
                    <Flex direction={'column'}>
                        <StyledHeading>
                            Our Numbers
                        </StyledHeading>
                        {OurNumbers.map((item)=>{
                            return(
                                <Flex key={item.id} justify='space-between'>
                                    <Text color='#ffa31a' fontSize={'20px'}>
                                        {item.stats}
                                    </Text>
                                    <Text>
                                        {item.title}
                                    </Text>
                                </Flex>
                            )
                        })}
                    </Flex>               
                    <Center w='100%'>
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
        <Flex borderRadius='5px' textAlign='center' align='center' direction='column' p='10px' m='0 10px'  h='150px' w='225px' key={features.id}>
            <Heading as='h5' fontSize='20px' color="#fff" fontFamily='Poppins-bold' mb='10px' textDecoration=' underline 5px solid #ffa31a'>{features.title}</Heading>
            <Center w='100%'>
                <Text fontSize='16px' >{features.content}</Text>
            </Center> 
        </Flex>
    )
}

const StyledDivContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background-color: #212222;
    color: #fff;
    text-align:center;
    padding: 10% 5%;
`
const StyledHeading = styled.h1`
    font-size: clamp(36px, 2.5vw, 64px);
    font-family: Poppins-bold; 
    text-decoration: underline #ffa31a;
    width: 100%;
    color: #fff
`

const StyledText = styled.p`
    font-size: clamp(16px, 2.5vw, 20px);
    width: 100%;
`
const StyledDiv = styled.div`
    box-shadow:
    2px 10.9px 10px rgba(0, 0, 0, 0.075),
    16px 87px 80px rgba(0, 0, 0, 0.15)
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