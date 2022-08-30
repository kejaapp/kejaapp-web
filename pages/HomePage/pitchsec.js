import { 
    Heading,
    Flex,
    Text,
    Center,Stack,Button
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
            <Flex direction='column' p='4' flex='1'>
                <StyledHeading>Whether you are a Home Owner or an Agent-managing a number of houses.<br/>We can help you move forward.</StyledHeading>
                <Flex direction='column' gap='3' color='grey'>
                    <li>
                        improve your online presence by listing your apartment or apartments ,<br /> on our platform and get traffic to your houses.
                    </li>
                    <li>
                        Get access to features to help manage and scale and grow your houses potential.
                    </li>
                    <li>
                        Manage multiple listings by having a designated account for listing.
                    </li>
                    <li>
                        Send a link to easily market all the units that you have to clients.
                    </li>
                    <Button bg='#ffa31a' borderRadius='0' color='#000'>Create an Account</Button>
                </Flex>
            </Flex>
            <StyledDiv />
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
        background-image: url("https://img.freepik.com/free-photo/modern-apartment-architecture_1268-14696.jpg?size=626&ext=jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        width:30vw
`