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

const Howto=[
    {
        id:'1',
        title:'Find a house you want to rent',
        body:'Do a search for the house you want'
    },
    {
        id:'2',
        title:'Contact the owner of the house',
        body:'Contact the owner of the house to get further details of the apartment and ask for vacancies rent queries.'
    },
    {
        id:'3',
        title:'Take the deal with the Owner',
        body:'Make an arrangement with the owner/ agent to rent the apartment. *Note* Keja.app does not handle any money and any agreement made with the owner is entirely between the two parties.'
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
    return(
    	<Flex>
    	<StyledDiv />
        <Flex direction='column' p='3' flex='1'>
        	<Text color='grey' mb='0'>practical way of use</Text>
        	<StyledHeading>How it Works</StyledHeading>
        	<Text>These are steps for renting a house</Text>
        	{Howto.map((item)=>{
        		return(
        			<Flex m='20px 0'>
		        		<div style={{width:'50px',height:'50px',backgroundColor:'#ffa31a',borderRadius:'100px',padding:'13px 21px'}}>{item.id}</div>
		        		<Flex direction='column' p='1' ml='2' borderLeft='1px solid #e5e5e5'>
			        		<Text mb='2' fontFamily='Poppins-bold' fontSize='18px'>{item.title}</Text>
			        		<Text fontSize='14px' color='grey'>{item.body}</Text>
		        		</Flex>
		        	</Flex>
        		)
        	})}
        	
        </Flex>
        </Flex>
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

const StyledHeading = styled.h1`
    font-size: 32px;
    width: 100%;
    font-weight: bold

`
const StyledDiv= styled.div`
        background-image: url("https://img.freepik.com/free-photo/modern-studio-apartment-design-with-bedroom-living-space_1262-12375.jpg?size=626&ext=jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width: 30vw
`