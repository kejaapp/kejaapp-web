import axios from 'axios'

const signup=async(user)=>{
    try{
        axios.post('https://keja--app.herokuapp.com/api/signup',{
            user
        }).then((res)=>{
            console.log(res.status)
            sessionStorage.setItem('usertoken',res.data)
            //console.log(res.data)
        }).catch((err)=>{
            console.log(err)
        })
    }catch(err){
        console.log('signup failed',err)
    }
}

export default signup;