import axios from "axios";

const getProperties= async(query)=>{
    //console.log('started')
    try{
        await axios.post('https://keja--app.herokuapp.com/api/getproperties',{
            query
        }).then((res)=>{
            //console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }catch(err){
        console.log(err)
    }
}
export default getProperties;