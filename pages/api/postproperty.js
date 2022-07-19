import axios from 'axios'
import { useToast } from '@chakra-ui/react';

const PostProperty=async(property)=>{
    const toast = useToast();
    //console.log(property)
    //https://keja--app.herokuapp.com
    try{
        await axios.post("https://keja--app.herokuapp.com/api/postproperty",{
            property
        }).then((res)=>{
            if(res.status === 201 ){
                return toast({
                    title: res.data,
                    status: 'error',
                    isClosable: true,
                  })
            }
        }).catch(()=>{
            console.log(err)
        })
    }catch(err){
        console.log(err)
    }
};

export default PostProperty;