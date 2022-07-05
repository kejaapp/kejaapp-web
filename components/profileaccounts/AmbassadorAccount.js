import {useState} from 'react';
import {
    Flex,
    Text,
    Center,
    Button,
    Image,
} from '@chakra-ui/react';
import ReviewApartment from '../modals/ReviewPropertyModal';
import { AmbassadorAccountModal } from '../modals/AmbassadorAccountModal';
import styled from 'styled-components';
import styles from '../../styles/Home.module.css'

function ReferAccount({data}){
    const [active,setActive]=useState(false);
    const [isModalvisible,setIsModalVisible]=useState(false);
    const [isCreatingAccModalvisible,setIsCreatingAccModalvisible]=useState(false);
    return(
        <>
            {active ?
                <Flex direction='column' gap='4'>
                    <Flex direction='column' gap='2' >
                        <Flex gap='6'>
                            <Text fontFamily={'Poppins-bold'}>Your Code:</Text>
                            <Text>{data?.code}</Text>
                        </Flex>
                        <Flex gap='6'>
                            <Text fontFamily={'Poppins-bold'}>Houses Reviwed:</Text>
                            <Text>{review.length}</Text>
                        </Flex>
                        <Flex gap='6'>
                            <Text fontFamily={'Poppins-bold'}>School:</Text>
                            <Text fontSize={'md'}>{data?.school}</Text>
                        </Flex>
                    </Flex>
                    <Flex direction={'column'} w='100%'>
                        <Text fontFamily={'Poppins-bold'}> Pending Reviews</Text>
                        <Flex borderTop={'1px solid #212222'} direction='column' gap='2' p='2 0' w='100%'>
                            <Text fontSize='10px'>You have {review.length} apartments to review</Text>
                            <StyledSlider className={styles.scrollbar}>
                                {review
                                .filter((review)=>review.reviewed === false )
                                .map((item)=>{
                                    return(
                                        <StyledDiv key={item.id} onClick={()=>setIsModalVisible(true)}>
                                            <Item  item={item}/>                         
                                        </StyledDiv>
                                    )
                                })}
                            </StyledSlider>
                            <ReviewApartment isModalvisible={isModalvisible} setIsModalVisible={setIsModalVisible}/>
                        </Flex>
                    </Flex>
                    <Flex direction={'column'} w='100%'>
                        <Text fontFamily={'Poppins-bold'}> Reviewed Apartments</Text>
                        <Flex borderTop={'1px solid #212222'} direction='column' gap='2' p='2 0' w='100%'>
                        <Text fontSize='10px'>You have reviewed {review.length} apartments </Text>
                            <StyledSlider className={styles.scrollbar}>
                                {review
                                .filter((review)=>review.reviewed === true )
                                .map((item)=>{
                                    return(
                                        <StyledDiv key={item.id} onClick={()=>setIsModalVisible(true)}>
                                            <Item  item={item}/>                         
                                        </StyledDiv>
                                    )
                                })}
                            </StyledSlider>
                            <ReviewApartment isModalvisible={isModalvisible} setIsModalVisible={setIsModalVisible}/>
                        </Flex>
                    </Flex>
                    <Button bg='#ffa31a'>
                        Request a payout
                    </Button>
                    <Button bg='#212222' fontFamily={'Poppins-bold'} color='#fff' onClick={(()=>setActive(false))}>Log out</Button>
                </Flex>
                :
                <Center mt='10%'>
                    <Flex direction='column' gap='2'>
                    <AmbassadorAccountModal isCreatingAccModalvisible={isCreatingAccModalvisible} setIsCreatingAccModalvisible={setIsCreatingAccModalvisible}/>
                        <Text >
                            Become an Ambassador and help grow the community.
                        </Text>
                        <a href="/help/ambassador" 
                            target="_blank"
                            rel="noopener noreferrer"> 
                        <Text fontSize='sm' color='#ffa31a' >Learn more </Text>
                        </a>
                        <Button bg='#ffa31a' fontFamily={'Poppins-bold'} color='#fff' onClick={(()=>{
                            setIsCreatingAccModalvisible(true)
                        })}
                        >Become an Ambassador</Button>
                        <Button bg='#212222' fontFamily={'Poppins-bold'} color='#fff' onClick={(()=>setActive(true))}>Log in</Button>
                    </Flex>
                </Center>
            }
        </>
    )
}

export default ReferAccount;

const review=[
    {
        name:'Zawadi Apartments',
        area:'Gate A',
        reviewed:true
    },
    {
        name:'Zawadi Apartments',
        area:'Gate B',
        reviewed:false
    },
]

const Item=({item})=>{
    return(
        <Flex direction='column' w='165px' h='175px' >
            <Image h='120px' w='165px' borderRadius='10px' src='https://a0.muscache.com/im/pictures/a003c1a8-0182-4b39-9e48-c6e0be6cbe11.jpg?im_w=320' alt='school photo' />
            <Text fontFamily='Poppins-bold' fontSize='14px' noOfLines={1}>
                {item.name}
            </Text>
            <Text fontSize='12px' p='1'>
                {item.area}
            </Text>
            
        </Flex>
    )
}

const StyledSlider = styled.div`
    display: flex;
    overflow: auto;
    white-space:nowrap;
    padding: 5px 0;
    margin: 0 0px;
`
const StyledDiv = styled.div`
    box-shadow:
    2px 10.9px 10px rgba(0, 0, 0, 0.075),
    16px 87px 80px rgba(0, 0, 0, 0.15)
    ;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    margin: 10px
`