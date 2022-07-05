import React,{useState,useEffect} from 'react';
import {Flex, Input, Select, Stack,Button,Center,Text} from '@chakra-ui/react'
import {Search} from '@mui/icons-material';
import Property from '../components/Property';
import styled from 'styled-components';
import axios from 'axios';
import {useRouter} from 'next/router'

export default function Explore(){
    const router = useRouter();
    const [school,setschool]=useState('');
    const [area,setarea]=useState('');
    const [type,settype]=useState('');
    const [price,setPrice]=useState('');

    const [data,setData]=useState([]);

    const query = {
        school,
        area,
        type,
        price
    }
    
    const getproperties=()=>{
        try{
            axios.post('https://keja--app.herokuapp.com/api/getproperties',{
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
        getproperties(query)
        //console.log(data)
    },[school,area,type]);
    //console.log(data.filter((item)=> item.title.includes('accusamus') && item.albumId.toString().includes('1')))
    const uniqueAreaArray = data.filter((item)=>
                                    item.school.includes(school)
                                )
                                .map(item => item.area)
                                .filter((value, index, self)=> self.indexOf(value) === index)
    //console.log(uniqueAreaArray)
    return (
        <Stack>
            
                <Flex direction={'column'}>

                    <Flex align={'center'} gap='1'>
                        <Select p='2' focusBorderColor = "#212222" borderRadius='0' borderRight='1px' color='#ffa31a' fontFamily='Poppins-bold' variant='flushed' placeholder='School' onChange={((e)=>{setschool(e.target.value); setarea("")})}>
                        <option value='JKUAT'>Jomo Kenyatta University of Agriculture</option>
                        <option value='Kenyatta University'>Kenyatta University</option>
                        <option value='Mount Kenya University'>Mount Kenya University</option>
                        </Select>
                        <Select focusBorderColor = "#ffa31a" borderRadius='md' borderRight='1px' m='2' fontFamily='Poppins-bold' variant='flushed' placeholder='Area' onChange={((e)=>{setarea(e.target.value)})}>
                            {uniqueAreaArray?.map((item)=> 
                                <option value={item}>{item}</option>
                                )
                            }
                        </Select>
                        <Select focusBorderColor = "#212222" borderRadius='0' fontFamily='Poppins-bold' variant='flushed' placeholder='Type' onChange={((e)=>{settype(e.target.value)})}>
                        <option value='bedsitter'>Bedsitter</option>
                        <option value='single'>Single</option>
                        <option value='hostel'>Hostel</option>
                        <option value='onebedroom'>One-Bedroom</option>
                        <option value='twobedroom'>Two-Bedroom</option>
                        <option value='threebedroom'>Three-Bedroom</option>
                        </Select>
                    </Flex>
                        <Flex flex='1' m='10px'>
                            <Input focusBorderColor = "#212222" borderRadius='0' placeholder='search by name,price' onChange={((e)=>setPrice(e.target.value))}/>
                            <Button colorScheme='#ffa31a' bg='#ffa31a' h='40px' borderRadius='0' onClick={getproperties}>
                                <Search color='#212222'/>
                            </Button>
                        </Flex>
                </Flex>
            
            <Center>
                <Flex flexWrap='wrap' justify={'space-around'}>
                    {data.map((item)=>{
                        return(
                            <StyledDiv key={item._id}>
                                <Property item={item}/>                        
                            </StyledDiv>
                        )
                    })}
                </Flex>
            </Center>
        </Stack>
    )
}

const StyledDiv = styled.div`
    box-shadow:
    2px 10.9px 10px rgba(0, 0, 0, 0.075),
    16px 87px 80px rgba(0, 0, 0, 0.15)
    ;
    border-radius: 10px;
    margin: 10px
`