import {useState} from 'react';
import {
    Flex,
    Text,
    Center,
    Button
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';

function ReferAccount({data}){
    const [active,setActive]=useState(false);
    return(
        <>
            {active ?
                <Flex direction='column' gap='4'>
                    <Flex direction='column' gap='2' >
                        <Flex gap='6'>
                            <Text fontFamily={'Poppins-bold'}>Code:</Text>
                            <Text>{data?.code}</Text>
                        </Flex>
                        <Flex gap='6'>
                            <Text fontFamily={'Poppins-bold'}>House Referred:</Text>
                            <Text>0</Text>
                        </Flex>
                        <Flex gap='6'>
                            <Text fontFamily={'Poppins-bold'}>Reward Coins</Text>
                            <Text>0</Text>
                        </Flex>
                        <Flex gap='6'>
                            <Text fontFamily={'Poppins-bold'}>School</Text>
                            <Text>{data?.school}</Text>
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

export default ReferAccount;
