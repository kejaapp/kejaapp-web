import {useState} from 'react';
import styled from 'styled-components';
import { Tabs, 
        TabList, 
        TabPanels, 
        Tab, 
        TabPanel,
        Input,
        Flex,
        Center,
        Text,
        Stack,
        Button,
        Image,
        Badge,
        Select
     } from '@chakra-ui/react'
import styles from '../styles/Home.module.css'
import ReviewApartment from '../components/modals/ReviewPropertyModal'; 
import {BookmarkAdded,BookmarkBorder,Delete,AddBox} from '@mui/icons-material';
import { AddNewItem } from '../components/modals/AddNewPropertyModal';
import { PromoteProperty } from '../components/modals/PromotePropertyModal';
import { ListingAccountModal } from '../components/modals/ListingAccountModal';
import { AmbassadorAccountModal } from '../components/modals/AmbassadorAccountModal';

export default function Profile(){
    return(
        <Flex direction={'column'} p='1'>
            <StyledHeading>
                John Doe
                <Badge mt='2' bg='#ffa31a' fontSize={'12px'}>Referer</Badge>
            </StyledHeading>
            <Text>
                JohnDoe@gmail.com
            </Text>
            <Tabs variant='enclosed' w='100vw'>
                <StyledSlider className={styles.scrollbar}>
                    <TabList spacing='3' >
                        <Tab><Text>Personal Info </Text></Tab>
                        <Tab><Text>Security</Text></Tab>
                        <Tab><Text>ReferAccount</Text></Tab>
                        <Tab><Text>AmbassadorAccount</Text></Tab>
                        <Tab><Text>Listing Account</Text></Tab>
                    </TabList>
                </StyledSlider>
                <TabPanels>
                    <TabPanel p='3px 0'><Personalinfo/></TabPanel>
                    <TabPanel><Security/></TabPanel>
                    <TabPanel><ReferAccount/></TabPanel>
                    <TabPanel><AmbassadorAccount/></TabPanel>
                    <TabPanel><Landlords/></TabPanel>
                    
                </TabPanels>
            </Tabs>
        </Flex>
    )
}

const Personalinfo=()=>{
    return(
        <Flex w='100%' p='0' direction='column' gap='3'>
            <Flex align={'center'} gap='3'>
                <Text>Name:</Text>
                <Input value={'John Doe'} variant='filled' bg='#eee'/>
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text>Email:</Text>
                <Input value={'JohnDoe@gmail.com'} variant='filled'  bg='#eee'/>
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text>Phone:</Text>
                <Input value={'07########'} variant='filled'  bg='#eee'/>
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text>School:</Text>
                <Input value={'Jomo Kenyatta University of Agriculture and Technology'} variant='filled'  bg='#eee'/>
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text>Gender:</Text>
                <Select bg='#eee' borderRadius='md' borderRight='1px' variant='flushed' placeholder='Gender'>
                        <option value='option1'>Male</option>
                        <option value='option2'>Female</option>
                        <option value='option3'>I'd rather not say</option>
                </Select>
            </Flex>
        </Flex>
    )
}

const Security=()=>{
    const [deleted,setDeleted]=useState(false);
    return(
        <>
        
        {
            deleted ? 
            <Text> No account found</Text>
            :

                <Flex w='100%' p='0' direction='column' gap='3'>
                    <Text>
                        Password
                    </Text>
                    <Input type='password' value={'Password'} variant='filled' bg='#eee'/>
                    <Stack borderTop='1px solid #212222' p='10px 0'>
                        <Text  fontFamily={'Poppins-bold'}>
                            Delete Account
                        </Text>
                        <Button color='red' bg='#eee' border={'1px solid red'} onClick={(()=>{setDeleted(true)})}>
                            Delete Account
                        </Button>
                    </Stack>
                </Flex>
            }
        </>
        )
}

const ReferAccount=()=>{
    const [active,setActive]=useState(false);

    return(
        <>
            {active ?
                <Flex direction='column' gap='4'>
                    <Flex direction='column' gap='2' >
                        <Flex gap='6'>
                            <Text fontFamily={'Poppins-bold'}>Code:</Text>
                            <Text>#sdvsjg</Text>
                        </Flex>
                        <Flex gap='6'>
                            <Text fontFamily={'Poppins-bold'}>House Referred:</Text>
                            <Text>0</Text>
                        </Flex>
                        <Flex gap='6'>
                            <Text fontFamily={'Poppins-bold'}>Total Earnings</Text>
                            <Text>ksh: 0</Text>
                        </Flex>
                        <Flex gap='6'>
                            <Text fontFamily={'Poppins-bold'}>School</Text>
                            <Text>Jomo Kenyatta University of Agriculture</Text>
                        </Flex>

                    </Flex>
                    <Button bg='#ffa31a'>
                        Request a withdrawal
                    </Button>
                    <Button bg='#212222' fontFamily={'Poppins-bold'} color='#fff' onClick={(()=>setActive(false))}>Log out</Button>
                </Flex>
                :
                <Center mt='10%'>
                    <Flex direction='column' gap='2'>
                        <Text >
                            Join Our Student refer program and start Earning.
                        </Text>
                        <Text fontSize='sm' color='#ffa31a'>Learn more </Text>
                        {/* onClick change account to refer  */}
                        <Button bg='#ffa31a' fontFamily={'Poppins-bold'} color='#fff' >Join</Button>
                        <Button bg='#212222' fontFamily={'Poppins-bold'} color='#fff' onClick={(()=>setActive(true))}>Log in</Button>
                    </Flex>
                </Center>
            }
        </>
    )
}

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

const AmbassadorAccount=()=>{
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
                            <Text>#sdvsjg</Text>
                        </Flex>
                        <Flex gap='6'>
                            <Text fontFamily={'Poppins-bold'}>Houses Reviwed:</Text>
                            <Text>{review.length}</Text>
                        </Flex>
                        <Flex gap='6'>
                            <Text fontFamily={'Poppins-bold'}>School:</Text>
                            <Text fontSize={'md'}>Jomo Kenyatta University of Agriculture</Text>
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
                        <a href="http://localhost:3000/help/ambassador" 
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

const property = [
    {   
        id:'1',
        name:'Zawadi',
        area:'Juja,Kiambu',
        promoted:false,
    },
    {
        id:'2',
        name:'Huru',
        area:'Ruiru,Kiambu',
        promoted:true,
    },
    
]

const Landlords=()=>{
    const [active,setActive]=useState(false);
    const [isAddNewPropertyModalvisible,setIsAddNewPropertyModalModalVisible]=useState(false);
    const [isModalvisible,setIsModalVisible]=useState(false);
    const [isListingModalvisible,setIsListingModalvisible]=useState(false);
    return(
        <>
        {active ? 
        <Flex direction='column'>
            <AddNewItem isAddNewPropertyModalvisible={isAddNewPropertyModalvisible} setIsAddNewPropertyModalModalVisible={setIsAddNewPropertyModalModalVisible}/>
            <PromoteProperty isModalvisible={isModalvisible} setIsModalVisible={setIsModalVisible}/>
            <Flex gap='3'>
                <Button bg='#212222' flex='1' color='#fff' fontFamily={'Poppins-bold'} onClick={(()=>{setIsAddNewPropertyModalModalVisible(true)})}><AddBox/>Add Property</Button>
                <Button onClick={(()=>setActive(false))} bg='#eee'>Logout</Button>
            </Flex>
            <Flex direction='column' borderTop='1px solid #212222' mt='2'>
                <Text>Listed Apartments</Text>
                {property.length !== 0 ?
                
                    <StyledSlider className={styles.scrollbar}>
                        {property.map((item)=>{
                            return(
                                <StyledDiv key={item.id}>
                                    <Property  item={item} value='promoted' setIsModalVisible={setIsModalVisible}/>                         
                                </StyledDiv>
                            )
                        })}
                    </StyledSlider>
                
                :
                <Center p='5'>
                    <Text color='grey'>You have not posted any property yet</Text>
                </Center>
                }
            </Flex>
            <Flex direction='column' borderTop='1px solid #212222' mt='2'>
                <Text>Promoted Apartments</Text>
                <Text fontSize={'12px'} color='grey'>Promote your apartments to rank high in our search sections</Text>
                {property.length !== 0 ?
                    <StyledSlider className={styles.scrollbar}>
                        {property
                        .filter((property)=> property.promoted === true)
                        .map((item)=>{
                            return(
                                <StyledDiv key={item.id}>
                                    <Property  item={item} value='promoted'/>                         
                                </StyledDiv>
                            )
                        })}
                    </StyledSlider>
                :
                <Center p='5'>
                    <Text color={'grey'}>You have not promoted any property yet</Text>
                </Center>
                }
                <Flex direction={'column'} borderTop='1px solid #212222' mt='2'>
                    <Text>Contact Support</Text>
                    <Text bg='#ffa31a' w='100px' p='1'>0771712005</Text>
                </Flex>
            </Flex>
        </Flex>
        :
        <Center mt='5%'>
            <Flex direction='column' gap='2'>
                <Text >
                    Welcome, Make your property visible to thousands of students
                </Text>
                <a href="http://localhost:3000/help/listing" 
                    target="_blank"
                    rel="noopener noreferrer"> 
                <Text fontSize='sm' color='#ffa31a' >Learn more </Text>
                </a>
                <ListingAccountModal isListingModalvisible={isListingModalvisible} setIsListingModalvisible={setIsListingModalvisible}/>
                <Button bg='#ffa31a' fontFamily={'Poppins-bold'} color='#fff' onClick={(()=>{setIsListingModalvisible(true)})}>Create a Listing account </Button>
                <Button bg='#212222' fontFamily={'Poppins-bold'} color='#fff' onClick={(()=>setActive(true))}>Log in</Button>
            </Flex>
        </Center>
        }
        </>
    )
}

const Property=({item,value,setIsModalVisible})=>{
    const [promoted,setPromoted]=useState(true);
    return(
        <Flex direction='column' w='200px' position={'relative'}>
            <Image h='150px' w='100%' borderRadius='10px' src='https://a0.muscache.com/im/pictures/a003c1a8-0182-4b39-9e48-c6e0be6cbe11.jpg?im_w=320' alt='school photo' />
            <Flex position='absolute' top='10px' right={'5px'} direction='column'>
                {item.promoted === true ? 
                <BookmarkAdded style={{color:'#ffa31a'}}/>
                :
                <BookmarkBorder />
                }
                {value === 'promoted' ? null : 
                <Delete style={{color:'red',opacity:'0.5'}}/>
                }
            </Flex>
            <Flex direction='column' p='1' gap='1'>
                <Text  fontFamily='Poppins-bold' fontSize='14px' noOfLines={1}>
                    {item.name}
                </Text>
                <Text fontSize='10px' >
                    {item.area}
                </Text>
                {item.promoted  === true ? 
                    null
                :
                <Button fontSize='12px' bg='#ffa31a' h='5' onClick={(()=>{setIsModalVisible(true)})}>Promote</Button>
                
                }
            </Flex>
        </Flex>
    )
}

const StyledHeading = styled.h1`
    font-size: clamp(36px, 2.5vw, 64px);
    font-family: Poppins-bold; 
    width: 100%;
`
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