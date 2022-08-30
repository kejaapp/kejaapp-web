import React, { useEffect,useState } from 'react';
import {Button,
        Center,
        Flex,
        Select,
        Text,
        Heading,
        Image,
        useToast
    } from "@chakra-ui/react";
import {Search,ArrowDownward }from '@mui/icons-material';
import styled from 'styled-components';
import styles from '../../styles/Home.module.css';
import axios from 'axios';
import {useRouter} from 'next/router'
import Script from 'next/script'
import Cookies from 'universal-cookie';

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
    const toast = useToast();

    const SubmitRequest=()=>{
        //console.log(query)

        if(school !== "" && area !== "" && type !== ""){
            window.open(`/${school}/${area}-${type}`, '_blank');    
        }
        return toast({
            title: '',
            description: "All inputs are required",
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
    }
    return(
        <Flex className={styles.indexfilterbody} >
            <Flex className={styles.indexfiltercontainer} > 
                <Flex className={styles.filterform} gap='3' zIndex='0'>
                    <Text className={styles.filterformHeading} color='#fff'>Student Housing</Text>
                    <Text className={styles.filterforminfo} color='#fff'>Find aparments around institutions anywhere anytime.</Text>
                    <Select borderRadius='0' p='1' bg='#fff' h='60px' fontFamily='Poppins-bold' variant='unstyled' placeholder='Select Institution' onChange={((e)=>{setschool(e.target.value); setarea("")})}>
                        <option value='jkuat'>Jomo Kenyatta University of Agriculture</option>
                    </Select>
                    <Select borderRadius='0' p='1' bg='#fff' h='60px' variant='unstyled' fontFamily='Poppins-bold' placeholder='Select desired area/location'  required onChange={((e)=>{setarea(e.target.value)})}>
                        <option value='gateA'>Gate A</option>
                        <option value='gateB'>Gate B</option>
                        <option value='gateC'>Gate C</option>
                        <option value='gateD'>Gate D</option>
                        <option value='gateE'>Gate E</option>
                        <option value='Gachororo'>Gachororo</option>
                    </Select>
                    <Select borderRadius='0' p='1' bg='#fff' h='60px' focusBorderColor = "#ffa31a" fontFamily='Poppins-bold' variant='unstyled' placeholder='Choose the type of aparment' onChange={((e)=>{settype(e.target.value)})}>
                        <option value='bedsitter'>Bedsitter</option>
                        <option value='single'>Single</option>
                        <option value='hostel'>Hostel</option>
                        <option value='onebedroom'>One-Bedroom</option>
                        <option value='twobedroom'>Two-Bedroom</option>
                        <option value='threebedroom'>Three-Bedroom</option>
                    </Select>
                    <Button m='1' colorScheme='#ffa31a' bg='#ffa31a' h='50px' borderRadius='0' onClick={SubmitRequest} fontSize='24px'>
                        Find your aparment            
                    </Button>
                </Flex>
            </Flex>
            <StyledDiv className={styles.imagefiltercontainer} />
        </Flex>
    )                 
}

const FilterBody =()=>{
    return
    (
        <Flex bg='blue' w='60vw' zIndex='200px'>
            <Text>Bpdy</Text>
            <Text>Bpdy</Text>
            <Text>Bpdy</Text>
            <Text>Bpdy</Text>
        </Flex>
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
        background-image: url("https://img.freepik.com/free-photo/positive-man-giggles-positively-concentrated-smartphone-screen-watches-funny-video-internet-laughs-received-message-dressed-casual-bright-clothes-isolated-orange-wall_273609-44605.jpg?size=626&ext=jpg");
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
`