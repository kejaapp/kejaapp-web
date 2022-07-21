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
    //console.log(data.filter((item)=> item.title.includes('accusamus') && item.albumId.toString().includes('1')))
    // const uniqueAreaArray = data.filter((item)=>
    //                                 item.school.includes(school)
    //                             )
    //                             .map(item => item.area)
    //                             .filter((value, index, self)=> self.indexOf(value) === index)
    // //console.log(uniqueAreaArray)
    return(
        <StyledDiv >
                <Center >
                    <Flex direction='column'>
                        <Heading className={styles.fadeInUp} as='h1' align='center' size='xl' fontFamily='Poppins-bold' textShadow='1px 2px 3px #666'>
                           No more hassle, ukisaka keja...
                        </Heading>
                        <Text size='xs' align='center' fontFamily='Poppins-regular'>
                            Find a home around your institution or school
                        </Text>
                    </Flex>
                </Center>
                <Center position={'relative'} m='2' boxShadow='lg' borderRadius='lg'  h='50px'>
                    <Select p='2' focusBorderColor = "#ffa31a" borderRadius='md' borderRight='1px' m='2' color='#ffa31a' fontFamily='Poppins-bold' variant='flushed' placeholder='School' onChange={((e)=>{setschool(e.target.value); setarea("")})}>
                    
                        <option value='JKUAT'>Jomo Kenyatta University of Agriculture</option>
                        {/* <option value='Kenyatta University'>Kenyatta University</option>
                        <option value='Mount Kenya University'>Mount Kenya University</option> */}
                    </Select>
                    <Select variant='flushed' placeholder='Area'  required onChange={((e)=>{setarea(e.target.value)})}>
                        <option value='gate A'>Gate A</option>
                        <option value='gate B'>Gate B</option>
                        <option value='gate C'>Gate C</option>
                        <option value='gate D'>Gate D</option>
                        <option value='gate E'>Gate E</option>
                        <option value='Gachororo'>Gachororo</option>
                    </Select>
                    <Select focusBorderColor = "#ffa31a" borderRadius='md' fontFamily='Poppins-bold' variant='flushed' placeholder='Type' onChange={((e)=>{settype(e.target.value)})}>
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
                    <Center position={'absolute'} top='52px'  w='100%' bg='#fff'>
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
                                <Text fontFamily='poppins-bold' color='#ffa31a' onClick={(()=>{router.push('explore/all')})}>view all</Text>
                            </Center>
                            }
                        </Flex>
                    </Center>
                    :
                    null
                        }
                </Center>
                <Center mt='10' > 
                    <Flex direction='column' alignItems={'center'}>
                            <Text  mt='10' size='md' fontFamily='Poppins-bold' >
                                Scroll to Explore
                            </Text>
                            <Script src='https://cdn.lordicon.com/xdjxvujz.js'></Script>
                            <lord-icon
                                src="https://cdn.lordicon.com/xhdhjyqy.json"
                                  trigger="loop"
                                    delay="2000"
                                style={{marginTop:'20px',width:'50px',height:"50px",zIndex:"-1"}}
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
                    <Text m='0'>{item.name}</Text>
                    <Text m='0'>Ksh {item.price}</Text>
                    <Text m='0'>{item.type}</Text>
                </Flex>
            </Flex>
        
    )
}


const StyledDiv= styled.div`
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column; 
        justify-content: center;
        align-items: center;
        z-index: 100;
        
`