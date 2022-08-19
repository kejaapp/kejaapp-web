import React,{useState,useEffect} from 'react';
import {Flex, Input, Select, Stack,Button,Center,Text,Image} from '@chakra-ui/react'
import {Search} from '@mui/icons-material';
import Property from '../../components/Property';
import styled from 'styled-components';
import axios from 'axios';
import styles from '../../styles/Home.module.css'
import {useRouter} from 'next/router'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Box,
    HStack,
    useNumberInput
  } from '@chakra-ui/react';
import Script from 'next/script'
import Loading from '../../components/loading.js';
import ReactPaginate from 'react-paginate';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function Explore(){
    const router = useRouter();
    const [school,setschool]=useState('');
    const [area,setarea]=useState('');
    const [type,settype]=useState('');
    const [price,setPrice]=useState('');

    const [data,setData]=useState([]);
    const [query,setQuery]=useState({})
    const [isquerrying,setisQuerrying]=useState(false)

    //handle number of pages
    const [pageNumber, setPageNumber]=useState(0)
    const propertyPerPage= 7;
    const pagesVisted = pageNumber * propertyPerPage;

    const pageCount = Math.ceil(data.length/propertyPerPage)
    const handlePageClick = ({selected})=>{
        setPageNumber(selected)
    }
    //https://keja--app.herokuapp.com/
    const getproperties=async(query)=>{
        setisQuerrying(true)
        //https://keja--app.herokuapp.com
        try{
            await axios.post('https://keja--app.herokuapp.com/api/getproperties',{
                query
            }).then((res)=>{
                //console.log(res.data)
                setTimeout(()=>{
                    setisQuerrying(false)
                    setData(res.data)
                },4000)
                
            }).catch((err)=>{
                console.log(err)
            })
        }catch(err){
            console.log(err)
        }
        
    }

    

    
    const { isOpen, onOpen, onClose } = useDisclosure();
    useEffect(()=>{
        getproperties(query)
    },[onClose]);

    return (
        <Stack>
            
                <Flex direction={'column'}>
                    <Button onClick={onOpen} m='5' w='100px' bg='#eee' align='center'>
                        <Script src="https://cdn.lordicon.com/xdjxvujz.js"></Script>
                        <Text m='0'>Filter</Text>
                    <lord-icon
                                 src="https://cdn.lordicon.com/otjugkwr.json"
    colors="primary:#212222,secondary:#ffa31a"
                                style={{width:'20px',height:"20px",}}
                                >
                            </lord-icon>
                    </Button>
                    <Filter onOpen={onOpen} onClose={onClose} isOpen={isOpen} getproperties={getproperties}/>
                </Flex>
            
            <Center>
                <Flex flexWrap='wrap' justify={'space-around'}>
                    {data.length === 0 && !isquerrying ? 
                    <Flex align='center' justify='center' direction='column' mt='20%'>
                        <Text fontFamily='Poppins-bold' w='80%'>We could not find the apartments you are looking for. Reload the page or Contact us by whatsapp @ <a href="https://wa.me/0771712005" rel="noreferrer" target="_blank" style={{color:"#ffa31a",fontFamily:"Poppins-bold"}}>0771712005</a> or call us at <a href='tel:0771712005' rel="noreferrer" target="_blank" style={{color:"#ffa31a",fontFamily:"Poppins-bold"}}>0771712005</a> for further assistance.</Text>
                        <Image  src='/failed.png' alt='no image found' w='200px' h='200px'/>
                    </Flex>:
                    <>
                        {
                            isquerrying ? 

                            <Flex align='center' justify='center' direction='column' mt='-15%'>
                                <Loading />
                            </Flex>
                    :
                            <>
                                {data?.slice(pagesVisted, pagesVisted + propertyPerPage).map((item)=>{
                                                        return(
                                                            <StyledDiv key={item._id}>
                                                                <Property item={item}/>                        
                                                            </StyledDiv>
                                                        )
                                                    })}
                            </>
                        }
                        
                    </>
                    }
                </Flex>
            </Center>
            <Center >
                <ReactPaginate
                    breakLabel="..."
                    nextLabel=<NavigateNextIcon style={{margin:"-5px",border:"1.5px solid #ffa31a",borderRadius:"99px"}}/>
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel=<NavigateBeforeIcon style={{margin:"-5px",border:"1.5px solid #ffa31a",borderRadius:"99px"}}/>
                    renderOnZeroPageCount={null}
                    containerClassName={styles.paginationbtns}
                    previousLinkClassName={styles.previousbtns}
                    nextLinkClassName={styles.nextbtns}
                    disabledClassName={styles.paginationDisabled}
                    activeClassName={styles.paginationActive}
                />           
            </Center>
        </Stack>
    )
}

const Filter=({onOpen,onClose,isOpen,getproperties})=>{
    const propertytype = [
        {type:'bedsitter'},
        {type:'hostel'},
        {type:'single'},
        {type:'onebedroom'},
        {type:'twobedroom'},
        {type:'threebedroom'},
    ]
    const schools = [
        {
            name:'Jomo Kenyatta University of Agriculture',
            value:'JKUAT',
        },
        {
            name:'Kenyatta University ',
            value:'Ku',
        },
    ]
    const areas = [
        {name:'gate A'},
        {name:'gate B'},
        {name:'gate C'},
        {name:'gate D'},
        {name:'gate E'},
        {name:'Gachororo'},
    ]
    

    const [schoolv,setschool]=useState('JKUAT');
    const [areav,setarea]=useState('');
    const [typev,settype]=useState('');
    const [value,setValue]=useState('');
    
    let active = true;

    

    const router= useRouter();
    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
            useNumberInput({
              step: 100,
              defaultValue: 6500,
            })

          const inc = getIncrementButtonProps()
          const dec = getDecrementButtonProps()
          const input = getInputProps()
    const handleSubmitFilter=()=>{
        
          const query = {
            school:schoolv !== '' ? schoolv : '',
            area:areav !== '' ? areav : '',
            type:typev !== '' ? typev : '',
            value:value !== '' ? value : '',
            price:input.value !== '' ? input.value : '',
        }
        setTimeout(()=>{
            getproperties(query)
            onClose()
        },1000)
         
    }
    const handleClearFilter=()=>{
        setschool('')
        setarea('')
        settype('')
        setValue('')
         onClose()
    }
  return (
    <>
      

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Filter </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Flex align={'center'} gap='1' direction='column'>
                        <Input focusBorderColor = "#212222" borderRadius='0' placeholder='search name of apartment' onChange={((e)=>{setValue(e.target.value)})}/>
                        <HStack maxW='400px'>
                          <Button {...inc}>+</Button>
                          <Input {...input} />
                          <Button {...dec}>-</Button>
                        </HStack>
                        <Flex direction='column' w='100%'>
                            <Text m='0' fontFamily='Poppins-bold'>School</Text>
                                <StyledSlider className={styles.scrollbar}>
                                    {schools.map((item)=>{
                                        return(
                                            <StyledDiv key={item.id} style={{padding:"10px"}} onClick={(()=>{setschool(item.value)})}> 
                                                <Text color={schoolv === item.value? "#ffa31a" : "#000000"} fontFamily={schoolv === item.value? "Poppins-bold" : "Poppins-regular"}>{item.name}</Text>
                                            </StyledDiv>
                                        )
                                    })}
                                </StyledSlider>
                        </Flex>

                        <Flex direction='column' w='100%'>
                            <Text m='0' fontFamily='Poppins-bold'>Area  |  Location</Text>
                                <StyledSlider className={styles.scrollbar}>
                                    {areas.map((item)=>{
                                        return(
                                            <StyledDiv key={item.id} style={{padding:"10px"}} onClick={(()=>{setarea(item.name)})}>
                                                <Text color={areav === item.name? "#ffa31a" : "#000000"} fontFamily={areav === item.name? "Poppins-bold" : "Poppins-regular"}>{item.name}</Text>
                                            </StyledDiv>
                                        )
                                    })}
                                </StyledSlider>
                        </Flex>
                        <Flex direction='column' w='100%'>
                            <Text m='0' fontFamily='Poppins-bold'>Property Type</Text>
                           <Center m='auto' w='100%' >
                                <StyledSlider className={styles.scrollbar}>
                                        {propertytype.map((item)=>{
                                            return(
                                            <StyledDiv key={item.id} style={{padding:"10px"}} onClick={(()=>{settype(item.type)})}>
                                                <Text color={typev === item.type? "#ffa31a" : "#000000"} fontFamily={typev === item.type? "Poppins-bold" : "Poppins-regular"}>{item.type}</Text>
                                            </StyledDiv>
                                                )
                                        })}
                                    </StyledSlider>
                            </Center>
                        </Flex>
                        
                    </Flex>
          </ModalBody>

          <ModalFooter>
            <Button bg='#ffa31a' mr={3} flex='1' onClick={handleSubmitFilter}>
              Search
            </Button>
            <Button variant='ghost' border={'1px solid red'} onClick={handleClearFilter}>Clear Filter</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}  

const StyledDiv = styled.div`
    box-shadow:
  0px 0.2px 2.2px rgba(0, 0, 0, 0.02),
  0px 0.5px 5.3px rgba(0, 0, 0, 0.028),
  0px 1px 10px rgba(0, 0, 0, 0.035),
  0px 1.8px 17.9px rgba(0, 0, 0, 0.042),
  0px 3.3px 33.4px rgba(0, 0, 0, 0.05),
  0px 8px 80px rgba(0, 0, 0, 0.07)
;

    border-radius: 10px;
    margin: 10px
`
const StyledSlider = styled.div`
    display: flex;
    overflow: auto;
    padding:5px;
    margin: 5px; 
    white-space:nowrap;
          
`