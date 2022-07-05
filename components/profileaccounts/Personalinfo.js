import {
    Flex,
    Input,
    Text,
    Select,
    Button
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

function Personalinfo({data}){
    const cookies = new Cookies();
    const router = useRouter();
    return(
        <Flex w='100%' p='0' direction='column' gap='3'>
            <Flex align={'center'} gap='3'>
                <Text>Name:</Text>
                <Text>{data?.name}</Text>
                {/* <Input  value= variant='filled' bg='#eee'/> */}
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text>Email:</Text>
                <Text>{data?.email}</Text>
                {/* <Input value= variant='filled'  bg='#eee'/> */}
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text>Phone:</Text>
                <Text>{data?.mobile}</Text>
                {/* <Input value= variant='filled'  bg='#eee'/> */}
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text>School:</Text>
                {/* <Text>Name:</Text> */}
                <Select  bg='#eee' borderRadius='md' borderRight='1px' variant='flushed' placeholder='School'>
                        <option value='option1'>Jomo Kenyatta University of Agriculture and Technology</option>
                        <option value='option2'>Kenyatta University</option>
                        <option value='option3'>Mount Kenya University</option>
                </Select>
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text>Gender:</Text>
                {/* <Text>Name:</Text> */}
                <Select  bg='#eee' borderRadius='md' borderRight='1px' variant='flushed' placeholder='Gender'>
                        <option value='option1'>Male</option>
                        <option value='option2'>Female</option>
                        <option value='option3'>Id rather not say</option>
                </Select>
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text>Referral code:</Text>
                <Text>{data?.code}</Text>
                {/* <Input value= variant='filled'  bg='#eee'/> */}
            </Flex>
            {
                data?.referredcount === 0 ?
                null
                :
                    <Flex align={'center'} gap='3'>
                        <Text>Tokens</Text>
                        <Text>{data?.referredcount * 20}</Text>
                        {/* <Input value= variant='filled'  bg='#eee'/> */}
                    </Flex>
            }
            <Button bg='#212222' fontFamily={'Poppins-bold'} color='#fff' onClick={(()=>{cookies.remove('usertoken'); router.push('/')})}>Log Out</Button>
        </Flex>
    )
}

export default Personalinfo;