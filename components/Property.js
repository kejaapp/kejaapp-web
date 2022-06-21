import React from 'react'
import {Flex, Image,Text} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import { Carousel } from 'antd';
import 'antd/dist/antd.css'

const image = [
    {
        img:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48729525/original/f62e1b1a-d6af-438b-82ce-95c51a4e0ca1.jpeg?im_w=720'
    },
    {
        img:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48729525/original/f62e1b1a-d6af-438b-82ce-95c51a4e0ca1.jpeg?im_w=720'
    },
    {
        img:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48729525/original/f62e1b1a-d6af-438b-82ce-95c51a4e0ca1.jpeg?im_w=720'
    },
    {
        img:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48729525/original/f62e1b1a-d6af-438b-82ce-95c51a4e0ca1.jpeg?im_w=720'
    },
    {
        img:'https://a0.muscache.com/im/pictures/prohost-api/Hosting-48729525/original/f62e1b1a-d6af-438b-82ce-95c51a4e0ca1.jpeg?im_w=720'
    }
]

export default function Property({item}){
    const router = useRouter();
    console.log(item.name)
    return(
        <Flex direction='column' w='350px' h='' onClick={(()=>{router.push('property')})}>
            <Carousel fade>
                        {image.map((item)=>{
                            return(
                                <div key={item.id}>
                                    <Image h='300px' w='100%' objectFit={'cover'} borderRadius='10px' src={item.img} alt='school photo' />
                                </div>
                                )
                            })}
                    </Carousel>
            <Flex p='2' direction='column'>
                <Text mb='0' fontFamily='Poppins-bold' color='#ffa31a' fontSize='18px' noOfLines={1}>
                    {item.name}
                </Text>
                <Text mb='0' fontFamily='Poppins-bold' fontSize='12px' noOfLines={1}>
                    Ksh {item.price}
                </Text>
                <Text mb='0' fontFamily='Poppins-bold' fontSize='12px' noOfLines={1}>
                    {item.type}
                </Text>
                <Text mb='0' fontFamily='Poppins-bold' fontSize='12px' noOfLines={1}>
                    {item.area}
                </Text>
            </Flex>
        </Flex>
    )
}