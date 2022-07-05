import axios from 'axios'
import Cookies from 'universal-cookie';


const Login=(user)=>{
    const cookies = new Cookies();
    
    try{
        axios.post('https://keja--app.herokuapp.com/api/login',{
            user
        }).then((res)=>{
            console.log(res.status)
            cookies.set('usertoken', res.data, { path: '/' });
        }).then(()=>{
            window.location.reload()
        }).catch((err)=>{
            console.log(err)
        })
        
    }catch(err){
        console.log('login failed',err)
    }
};

export default Login;