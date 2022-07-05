import React,{useState} from 'react';
import {
    Button
}from '@chakra-ui/react';
import styled from 'styled-components';
import {useRouter} from 'next/router';
import axios from 'axios';
import loading from '../../components/loading.js'

function Verify(){
    const router = useRouter();
    const [isloading,setisloading] = useState(false)
    const query = router.query;
    console.log(query.id);

    const handleVerification=async()=>{
        setisloading(true);
        const email = query.id
        try{
            await axios.post('https://keja--app.herokuapp.com/api/verify',{
                email
            }).then((res)=>{
                console.log(res.status)
                if(res.status !== 200){
                    console.log('verification failed')
                }
                setTimeout(() => {
                    console.log('success')
                    router.push('/')
                }, 5000);
            })
        }catch(err){
            console.log(err)
        }
    }
    return(
        <StyledDiv>
            <Button bg='#ffa31a' p='2' fontFamily='Poppins-bold' color='#212222' onClick={handleVerification}> Verify account</Button>
        </StyledDiv>
    )
}

export default Verify;  

const StyledDiv= styled.div`
        width: 100%;
        height: 70vh;
        display: flex;
        flex-direction: column; 
        justify-content: center;
        align-items: center;
        
`