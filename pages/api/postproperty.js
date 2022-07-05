import axios from 'axios'

const PostProperty=async(property)=>{
    //console.log(property)
    try{
        await axios.post("https://keja--app.herokuapp.com/api/postproperty",{
            property
        })
    }catch(err){
        console.log(err)
    }
};

export default PostProperty;