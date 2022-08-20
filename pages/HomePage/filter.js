import React, { useEffect,useState } from 'react';
import {Button,
        Center,
        Flex,
        Select,
        Text,
        Heading,
        Image,
    } from "@chakra-ui/react";
import {Search,ArrowDownward }from '@mui/icons-material';
import styled from 'styled-components';
import styles from '../../styles/Home.module.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import Script from 'next/script'

export default function Filter (){
    const router = useRouter();
    const [school,setschool]=useState('');
    const [area,setarea]=useState('');
    const [type,settype]=useState('');

    const [data,setData]=useState([]);

    const query = {
        school,
        area,
        type
    }
    //www.keja.app
    const getproperties=()=>{
        
        try{
            axios.post( `https://keja--app.herokuapp.com/api/getproperties`,{
                query
            }).then((res)=>{
                //console.log(res.data)
                setData(res.data)
            }).catch((err)=>{
                console.log(err)
            })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        if(school === ''){
            return setData([])
        }
        return getproperties(query)
    },[school,area,type]);
    return(
        <StyledDiv >
                <Center >
                    <Flex direction='column'>
                        <Heading as='h1' align='center' fontSize='42px' fontWeight='bold' fontFamily='Poppins-bold' >
                          Finding the right home.
                        </Heading>
                        <Text mt='2' size='xs' align='center' fontFamily='Poppins-regular'>
                            Find a home around your institution or school
                        </Text>
                    </Flex>
                </Center>
                <Center bg='#fff' position={'relative'} m='2' boxShadow='lg' borderRadius='lg'  h='50px'>
                    <Select p='2'  m='2' color='#ffa31a' fontFamily='Poppins-bold' variant='unstyled' placeholder='School' onChange={((e)=>{setschool(e.target.value); setarea("")})}>
                        <option value='jkuat'>Jomo Kenyatta University of Agriculture</option>
                    </Select>
                    <Select variant='unstyled' fontFamily='Poppins-bold' placeholder='Area'  required onChange={((e)=>{setarea(e.target.value)})}>
                        <option value='gate A'>Gate A</option>
                        <option value='gate B'>Gate B</option>
                        <option value='gate C'>Gate C</option>
                        <option value='gate D'>Gate D</option>
                        <option value='gate E'>Gate E</option>
                        <option value='Gachororo'>Gachororo</option>
                    </Select>
                    <Select focusBorderColor = "#ffa31a" borderRadius='md' fontFamily='Poppins-bold' variant='unstyled' placeholder='Type' onChange={((e)=>{settype(e.target.value)})}>
                        <option value='bedsitter'>Bedsitter</option>
                        <option value='single'>Single</option>
                        <option value='hostel'>Hostel</option>
                        <option value='onebedroom'>One-Bedroom</option>
                        <option value='twobedroom'>Two-Bedroom</option>
                        <option value='threebedroom'>Three-Bedroom</option>
                    </Select>
                    <Button colorScheme='#ffa31a' bg='#ffa31a' h='100%' borderRadius='0' onClick={getproperties}>
                        <Search color='#212222'/>                        
                    </Button>
                    {data ? 
                    <Center position={'absolute'} top='52px'  w='100%' bg='#fff' zIndex={1}>
                        <Flex direction={'column'}  borderRadius={'10px'} boxShadow='dark-lg' w='100%'>
                            {
                                data.slice(0,3).map((item)=>{
                                    return(
                                        <div key={item._id}>
                                            <SearchModal item={item} />
                                        </div>
                                    )
                                })
                            }
                            {data?.length === 0?
                                null:
                            <Center>
                                <Button bg='#ffa31a' color='#fff' onClick={(()=>{window.open(`/explore/all`, '_blank');})}> Click to Browse from a list of Aparments </Button>
                            </Center>
                            }
                        </Flex>
                    </Center>
                    :
                    null
                        }
                </Center>

                <Center mt='10' zIndex={0}> 
                    <Flex direction='column' alignItems={'center'}>
                            <Text  mt='10' size='md' fontFamily='Poppins-bold' >
                                Scroll to Explore
                            </Text>
                            <Script src='https://cdn.lordicon.com/xdjxvujz.js'></Script>
                            <lord-icon
                                src="https://cdn.lordicon.com/xhdhjyqy.json"
                                  trigger="loop"
                                    delay="2000"
                                style={{marginTop:'20px',width:'50px',height:"50px",zIndex:"0"}}
                                >
                            </lord-icon>
                            
                    </Flex>
                </Center>
        </StyledDiv>
    )                 
}


const SearchModal=({item})=>{
    const router = useRouter();
    return(
            <Flex m='5px' p='2' borderBottom='1px solid grey' onClick={(()=>{router.push(`/property/${item._id}`)})}>
                <Image boxSize={70} src={item.images[0]} alt='photo' objectFit='cover' borderRadius={5}/>
                <Flex direction={'column'} flex='1' marginLeft={5} >
                    <Text m='0' fontFamily='Poppins-bold'>{item.name}</Text>
                    <Text m='0'>Ksh {item.price}</Text>
                    <Text m='0'>{item.type}</Text>
                </Flex>
            </Flex>
        
    )
}


const StyledDiv= styled.div`
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column; 
        justify-content: center;
        align-items: center;
        z-index: 100;
        background-image: url("https://img.freepik.com/free-vector/silhouette-skyline-illustration_53876-78786.jpg?w=740&t=st=1658941275~exp=1658941875~hmac=224e4ec9abb37db60c8f242fdcc22b8c04f4c720087106e23bb8d39df219f5cf");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
`