import {
    Flex,
    Input,
    Text,
    Select,
    Button
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Cookies from 'universal-cookie';
import {useState} from 'react'
import axios from 'axios';
function Personalinfo({data}){
    const [editname,seteditname]=useState(data.name);
    const [editmobile,seteditmobile]=useState(data.mobile);
    const [editemail,seteditemail]=useState(data.email);
    const [editgender,seteditgender]=useState(data.gender);
    const [editschool,seteditschool]=useState(data.school);

    const [active,setactive]=useState(false);

    const editProfile = async()=>{  
        const edituser = {
            name: editname,
            mobile: editmobile,
            gender: editgender,
            school: editschool,
            email: editemail,
        }
        //console.log(edituser)
        try{
            await axios.post("https://keja--app.herokuapp.com/api/editprofile",{edituser}).then((res)=>{
                    setactive(true)
                    //console.log(res.data)
                    if(res.status === 200){
                       return setTimeout(()=>{
                            alert(res.data)
                            router.reload()
                        },3000) 
                    }
                    return alert(res.data)
                })
        }catch(err){
            console.log(err)
        }
    }
    const cookies = new Cookies();
    const router = useRouter();
    return(
        <Flex w='100%' p='0' direction='column' gap='3'>
            <Flex align={'center'} gap='3'>
                <Text fontFamily='Poppins-bold'>Name:</Text>
                {active ? <Input variant='filled' value={editname} bg='#eee' onChange={((e)=>{seteditname(e.target.value)})}/> :  <Text>{data?.name}</Text>  }
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text fontFamily='Poppins-bold'>Email:</Text>
                { active ? <Input  variant='filled' value={editemail} bg='#eee' onChange={((e)=>{seteditemail(e.target.value)})}/> : <Text>{data?.email}</Text> }
                
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text fontFamily='Poppins-bold'>Phone:</Text>
                { active ? <Input  variant='filled' value={editmobile} bg='#eee' onChange={((e)=>{seteditmobile(e.target.value)})}/> : <Text>0{data?.mobile}</Text> }
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text fontFamily='Poppins-bold'>School:</Text>
                { active ?
                    <Select  value={editschool} bg='#eee' borderRadius='md' borderRight='1px' variant='flushed' placeholder='School' onChange={((e)=>{seteditschool(e.target.value)})}>
                        <option value='Jomo Kenyatta University of Agriculture and Technology'>Jomo Kenyatta University of Agriculture and Technology</option>
                        <option value='Kenyatta University'>Kenyatta University</option>
                        <option value='Mount Kenya University'>Mount Kenya University</option>
                    </Select> 
                : <Text bg='#eee'>{data?.school}</Text> 
            }
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text fontFamily='Poppins-bold'>Gender:</Text>
                { active ? 
                    <Select  value={editgender} bg='#eee' borderRadius='md' borderRight='1px' variant='flushed' placeholder='Gender' onChange={((e)=>{seteditgender(e.target.value)})}>
                        <option value='Male'>Male</option>
                        <option value='Female'>Female</option>
                        <option value='Id rather not say'>Id rather not say</option>
                    </Select>
                    : <Text bg='#eee'>{data?.gender}</Text> 
                }
            </Flex>
            <Flex align={'center'} gap='3'>
                <Text fontFamily='Poppins-bold'>Referral code:</Text>
                <Text>{data?.code}</Text>
            </Flex>
            {
                data?.referredcount === 0 ?
                null
                :
                    <Flex align={'center'} gap='3'>
                        <Text fontFamily='Poppins-bold'>Tokens:</Text>
                        <Text>{data?.referredcount * 20}</Text>
                    </Flex>
            }
            <Flex gap='2'>
                {active === true ? <Button bg='#eeeee' fontFamily={'Poppins-bold'} flex='1' color='#212222' onClick={editProfile}>Update Profile</Button> : <Button flex='1' bg='#ffa31a' fontFamily={'Poppins-bold'} color='#212222' onClick={(()=>{setactive(true)})}>Edit Profile</Button> }
            // <Button bg='#212222' fontFamily={'Poppins-bold'} color='#fff' onClick={(()=>{cookies.remove('usertoken'); 
            //             setTimeout(()=>{
            //                 router.push('/');
            //                 router.reload();
            //               },2000)})}>Log Out</Button>
            </Flex>
            
        </Flex>
    )
}

export default Personalinfo;