import {useEffect, useState} from 'react';
import styled from 'styled-components';
import { Tabs, 
        TabList, 
        TabPanels, 
        Tab, 
        TabPanel,
        Flex,
        Text,
        Badge,
     } from '@chakra-ui/react'
import styles from '../../styles/Home.module.css'
import Loading from '../../components/loading.js';
import axios from 'axios'
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

//profile accounts
import Personalinfo from '../../components/profileaccounts/Personalinfo.js'
import Security from '../../components/profileaccounts/Security.js';
// import ReferAccount from '../../components/profileaccounts/ReferAccount.js';
// import AmbassadorAccount from '../../components/profileaccounts/AmbassadorAccount.js'
// import Landlords from '../../components/profileaccounts/Landlords';

export default function Profile(){
    const [isloading,setisloading]=useState(true);
    const [data,setData]=useState([])
    const router = useRouter();
    const cookies = new Cookies();
    let token = cookies.get('usertoken');

    const id = router.query;
    
    const getUser= async ()=>{
        try{
            if(!token || token === null){
                router.push('/')
                return console.log('no token found, please sign in')
            }
            //https://keja--app.herokuapp.com/api/getuser
            await axios.post('https://keja--app.herokuapp.com/api/getuser',{
                token
            }).then((res)=>{
                //console.log(res.data)
                setData(res.data);
                if(res.status === 200){
                    setTimeout(()=>{
                        setisloading(false);
                    },3000)
                }
            }).catch((err)=>{
                console.log(err);
            })
        }catch(err){
            console.log(err)
        }
    }
    useEffect(()=>{
        getUser();
    },[id])
    

    return(
        <>
        {isloading?
            <Loading />
            :
        <Flex direction={'column'} p='1'>
            <StyledHeading >
                {data?.name}
                <Badge m='2' bg='#ffa31a' fontSize={'12px'}>{data?.tier}</Badge>
            </StyledHeading>
            <Text>
                {data?.email}
            </Text>
            <Tabs variant='enclosed' w=''>
                <StyledSlider className={styles.scrollbar}>
                    <TabList spacing='3' >
                        <Tab><Text>Personal Info </Text></Tab>
                        <Tab><Text>Security</Text></Tab>
                        {/* <Tab><Text>ReferAccount</Text></Tab>
                        <Tab><Text>AmbassadorAccount</Text></Tab> */}
                        {/* <Tab><Text>Listing Account</Text></Tab> */}
                    </TabList>
                </StyledSlider>
                <TabPanels>
                    <TabPanel p='3px 0'><Personalinfo data={data}/></TabPanel>
                    <TabPanel><Security data={data}/></TabPanel>
                    {/* <TabPanel><ReferAccount data={data}/></TabPanel>
                    <TabPanel><AmbassadorAccount data={data}/></TabPanel> */}
                    {/* <TabPanel><Landlords/></TabPanel> */}
                </TabPanels>
            </Tabs>
        </Flex>
        }
        </>
    )
}


const StyledHeading = styled.h1`
    font-size: 28px;
    font-family: Poppins-bold;
`
const StyledSlider = styled.div`
    display: flex;
    overflow: auto;
    white-space:nowrap;
    padding: 5px 0;
    margin: 0 0px;
`