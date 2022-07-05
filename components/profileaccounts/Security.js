import { useState } from 'react';
import {
    Flex,
    Input,
    Text,
    Button,
    Stack
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';

function Security({data}){
    const [deleted,setDeleted]=useState(false);
    const cookies = new Cookies();
    let token = cookies.get('usertoken');
    const router = useRouter();

    const HandleDelete = async()=>{
        console.log('deleting account')
        try{
            await axios.post('https://keja--app.herokuapp.com/api/deleteuser',{
                token
            }).then((res)=>{
                cookies.remove('usertoken');
                if(res.status === 200){
                    setTimeout(() => {
                        router.reload()
                        router.push('/')
                    }, 3000);
                }
            }).catch((err)=>{
                console.log(err)
            })
        }catch(err){
            console.log(err)
        }
    }
    return(
        <>
        <Flex w='100%' p='0' direction='column' gap='3'>
                    <Text>
                        Password
                    </Text>
                    <Input type='password' value={data?.password} variant='filled' bg='#eee'/>
                    <Stack borderTop='1px solid #212222' p='10px 0'>
                        <Text  fontFamily={'Poppins-bold'}>
                            Delete Account
                        </Text>
                        <Button color='red' bg='#eee' border={'1px solid red'} onClick={HandleDelete}>
                            Delete Account
                        </Button>
                    </Stack>
                </Flex>
        </>
        )
}

export default Security;