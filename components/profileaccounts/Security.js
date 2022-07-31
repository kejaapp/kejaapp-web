import { useState } from 'react';
import {
    Flex,
    Input,
    Text,
    Button,
    Stack,
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { useRouter } from 'next/router';
import Loading from '../loading.js'
function Security({data}){
    const [deleted,setDeleted]=useState(false);
    const [isdeleting,setIsdeleting]=useState(false);

    const cookies = new Cookies();
    let token = cookies.get('usertoken');

    const router = useRouter();
    const toast = useToast();

    const HandleDelete = async()=>{
        //console.log('deleting account')
        toast({
            title: 'Deleting Account',
            description: "We are sad to see you leave us. We hope to see you back soon.",
            status: 'error',
            duration: 10000,
            isClosable: true,
          })
       try{
                await axios.post('https://keja--app.herokuapp.com/api/deleteuser',{
                    token
                }).then((res)=>{
                    //console.log(res.status)
                    if(res.status === 200){
                        cookies.remove('usertoken');
                        router.reload()
                        router.push('/')
                        setIsdeleting(false)
                    }
                    alert(res.data)
                }).catch((err)=>{
                    console.log(err)
                })
            }catch(err){
                console.log(err)
            }setIsdeleting(false)
        
    }
    return(
        <>
        <Flex w='100%' p='0' direction='column' gap='3'>
            {isdeleting ? 
                <Loading />
                :
                <>
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
                </>
                
            }
                    
                </Flex>
        </>
        )
}

export default Security;