import React,{useState} from 'react'
import {Flex, Image,Text} from '@chakra-ui/react'
import {useRouter} from 'next/router'
import { Carousel } from 'antd';
import 'antd/dist/antd.css';
import { SubscriptionModal } from './modals/SubscriptionModal';

export default function Property({item}){
    const router = useRouter();
    // console.log(item.name)
    const images = item.images;
    const [isModalvisible,setIsModalVisible] = useState(false);

    const HandleView=()=>{
       window.open(`/property/${item._id}`, '_blank');
       // console.log('sefe')
       // setIsModalVisible(true)
       // console.log(isModalvisible)
    }
    return(
        <Flex direction='column' w='350px' h='' onClick={HandleView}>
            <SubscriptionModal isModalvisible={isModalvisible} setIsModalVisible={setIsModalVisible}/>
            <Carousel fade>
                        {images.map((item)=>{
                            return(
                                <div key={item.id}>
                                    <Image h='300px' w='100%' objectFit={'cover'} borderRadius='10px' src={item} alt='school photo' />
                                </div>
                                )
                            })}
                    </Carousel>
            <Flex p='2' direction='column'>
                <Flex justify='space-between' alignItems={'center'}>
                    <Text mb='0' fontFamily='Poppins-bold' color='#ffa31a' fontSize='22px' noOfLines={1}>
                        {item.name}
                    </Text>
                    <Text mb='0' fontFamily='Poppins-bold' fontSize='18px' noOfLines={1}>
                        Ksh {item.price}
                    </Text>
                </Flex>
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