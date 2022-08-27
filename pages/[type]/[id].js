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
    useNumberInput,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack,
    RangeSliderThumb,
  } from '@chakra-ui/react';
import Script from 'next/script'
import Loading from '../../components/loading.js';
import ReactPaginate from 'react-paginate';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Cookies from 'universal-cookie';

export default function Explore(){
    const router = useRouter();
    
    const cookies = new Cookies();
    const param = cookies.get('param');    

    let [school,setschool]=useState(param?.school ? param?.school : '');
    let [area,setarea]=useState(param?.area ? param?.area : "");
    let [type,settype]=useState(param?.type ? param?.type : "");
    let [minprice,setminprice]=useState(param?.minprice ? param?.minprice : "");
    let [maxprice,setmaxprice]=useState(param?.maxprice ? param?.maxprice : "");

    const [data,setData]=useState([]);
    const [isquerrying,setisQuerrying]=useState(false)

    //handle number of pages
    const [pageNumber, setPageNumber]=useState(0)
    const propertyPerPage= 7;
    const pagesVisted = pageNumber * propertyPerPage;

    const pageCount = Math.ceil(data.length/propertyPerPage)
    const handlePageClick = ({selected})=>{
        setPageNumber(selected)
    }
    const query = {
    	school,
    	area,
    	type,
    	minprice:parseInt(minprice),
        maxprice:parseInt(maxprice)
    }
    //https://keja--app.herokuapp.com/
    const getproperties=async(query)=>{
        //console.log(query)
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
    useEffect(()=>{
        //console.log(router.query.id)
        if(router?.query?.id === 'all'  ){
            const query = {
                school:'jkuat',
                area:'',
                type:'',
                minprice:parseInt(minprice),
                maxprice:parseInt(maxprice)
            }
            //console.log(query)
            if(query.school !== ""){
                router.reload()
            }else{
                getproperties(query)
            }
        }else{
        //router.reload()
        if(router.query.id === undefined){
            //console.log('undefined')
        }else{
                getproperties(query)
                if(param?.area !== area || param?.type !== type){
                    router.reload()
                }
            }
        }
    },[param?.area])
        
    const { isOpen, onOpen, onClose } = useDisclosure();
    

    return (
        <Stack>
                <Flex direction={''} align='center' mb='0' p='1'>
                    <Button onClick={onOpen} m='1' w='100px' bg='#eee' align='center'>
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
                    <Stack pt='3' ml='4' fontFamily='Poppins-bold'>
                    <Breadcrumb separator='>' >
                      <BreadcrumbItem>
                        <BreadcrumbLink >{router.query.type === "" ? category : router.query.type }</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbItem>
                        <BreadcrumbLink >{router.query.id === "" ? subcategory : router.query.id }</BreadcrumbLink>
                      </BreadcrumbItem>
                    </Breadcrumb>
                    </Stack>
                </Flex>
            
            <Center>
                <Flex flexWrap='wrap' justify={'space-around'}>
                    {data.length === 0 && !isquerrying ? 
                    <Flex align='center' justify='center' direction='column' mt='20%'>
                        <Text fontFamily='Poppins-bold' w='80%'>We could not find the apartments you are looking for. Reload the page or Contact us by whatsapp @ <a href="https://wa.me/0771712005" rel="noreferrer" target="_blank" style={{color:"#ffa31a",fontFamily:"Poppins-bold"}}>0771712005</a> or call us at <a href='tel:0771712005' rel="noreferrer" target="_blank" style={{color:"#ffa31a",fontFamily:"Poppins-bold"}}>0771712005</a> for further assistance.</Text>
                        <Image  src='/failed.png' alt='no image found' w='200px' h='200px'/>
                    </Flex>
                    :
                    <>
                        {
                            isquerrying ? 

                            <Flex align='center' justify='center' direction='column' mt='-15%'>
                                <Loading />
                            </Flex>
                    :
                            <>
                                {data?.slice(pagesVisted, pagesVisted + propertyPerPage)
                                    .map((item)=>{
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

const Filter=({onOpen,onClose,isOpen})=>{
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
            value:'jkuat',
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
    

    const [schoolv,setschool]=useState('jkuat');
    const [areav,setarea]=useState('gate A');
    const [typev,settype]=useState('bedsitter');
    const [value,setValue]=useState('');
    const [pval,setpval]=useState([])
    
    let active = true;

    const router= useRouter();

    const cookies = new Cookies(); 
    const query = {
            school:schoolv !== '' ? schoolv : '',
            area:areav !== '' ? areav : '',
            type:typev !== '' ? typev : '',
            minprice: pval[0]? pval[0] : '1000',
            maxprice: pval[1]? pval[1] : '20000',
            value:value !== '' ? value : '',
            //price:input.value !== '' ? input.value : '',
        }
        //console.log(query)
    const handleSubmitFilter=()=>{
        cookies.remove('param');
        setTimeout(()=>{
            
            //console.log(query)
                if(query.school !== "" && query.area !== "" && query.type !== ""){
                        cookies.set('param', query, { path: '/' });
                        router.push(`/${query.school}/${query.area}-${query.type}`); 
                        onClose()
                }
        },1000)
    }
    const getproperties=async(query)=>{
        window.open(`/${schoolv}/${areav}-${typev}`);
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
                        <HStack w='100%' gap='2'>
                         <Text w='' mb='0' bg='#eee' p='2' borderRadius='5'>{pval[0]? pval[0] :"6500"}</Text>
                         <RangeSlider aria-label={['min', 'max']}  defaultValue={[6500, 20000]}  max={20000} step={100} onChangeEnd={(val) => setpval(val)} flex='1'>
                          <RangeSliderTrack>
                            <RangeSliderFilledTrack />
                          </RangeSliderTrack>
                          <RangeSliderThumb index={0} />
                          <RangeSliderThumb index={1} />
                            </RangeSlider>
                         <Text mb='0' bg='#eee' p='2' borderRadius='5'>{pval[1]? pval[1] : "12000"  }</Text>
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
            <Button variant='ghost' border={'1px solid red'} onClick={handleClearFilter}>Clear Filter</Button>
            <Button bg='#ffa31a' ml={3} flex='1' onClick={handleSubmitFilter}>
              Filter
            </Button>
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