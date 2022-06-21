import React from 'react';
import {Flex, Input, Select, Stack,Button,Center,Text} from '@chakra-ui/react'
import {Search} from '@mui/icons-material';
import Property from '../components/Property';
import styled from 'styled-components';

const properties=[
    {
        id:1,
        name:'Zawadi Apartments',
        image:'',
        price:'6500',
        area:'Gate A',
        type:'Bedsitter'
    },
    {
        id:2,
        name:'Virmaj Apartments',
        image:'',
        price:'6500',
        area:'Gate C',
        type:'OneBedroom'
    },
    {
        id:3,
        name:'Executive Apartments',
        image:'',
        price:'16500',
        area:'Gate C',
        type:'Bedsitter'
    },
]
export default function Explore(){
    return (
        <Stack>
            <Center>
                <Flex align={'center'} gap='1'>
                    <Select flex={0.3} w='' p='2' focusBorderColor = "#212222" borderRadius='0' borderRight='1px' color='#ffa31a' fontFamily='Poppins-bold' variant='flushed' placeholder='School'>
                            <option value='option1'>Jomo Kenyatta University of Agriculture</option>
                            <option value='option2'>Kenyatta University</option>
                            <option value='option3'>Mount Kenya University</option>
                    </Select>
                    <Select flex={0.3} w='' focusBorderColor = "#212222" borderRadius='0' fontFamily='Poppins-bold' variant='flushed' placeholder='Type'>
                            <option value='option1'>Bedsitter</option>
                            <option value='option2'>Single</option>
                            <option value='option3'>Hostel</option>
                            <option value='option3'>One-Bedroom</option>
                            <option value='option3'>Two-Bedroom</option>
                            <option value='option3'>Three-Bedroom</option>
                    </Select>
                    <Flex flex='1' m='10px'>
                        <Input focusBorderColor = "#212222" borderRadius='0' placeholder='search by area,price'/>
                        <Button colorScheme='#ffa31a' bg='#ffa31a' h='40px' borderRadius='0' >
                            <Search color='#212222'/>
                        </Button>
                    </Flex>
                </Flex>
            </Center>
            <Center>
                <Flex flexWrap='wrap' justify={'space-around'}>
                    {properties.map((item)=>{
                        return(
                            <StyledDiv key={item.id}>
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