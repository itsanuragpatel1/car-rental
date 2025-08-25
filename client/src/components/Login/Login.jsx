import React, {useState } from 'react'
import './Login.css'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext.jsx'
import axios from 'axios'

const Login = (props) => {

    const [status,setStatus]=useState("Login");

    const [name,setName]=useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');
    const [loading,setLoading]=useState(false);
    
    const {loginUser}=useAuth();
    
    const submitHandler=async(e)=>{
        e.preventDefault();
        setLoading(true)

        const endpoint=status=='Login'?`${import.meta.env.VITE_BACKEND_URL}/api/user/login`:`${import.meta.env.VITE_BACKEND_URL}/api/user/register`;
        const userData={name,email,password};
        // console.log(userData ,endpoint);
        const {data}=await axios.post(endpoint,userData,{withCredentials:true});
        
      if(data.success){
        toast.success(data.message);
        loginUser(data.userData);
        props.setShowLogin(false);
      }else{
         toast.error(data.message);
      }

      setLoading(false)
    }

   
  return (
    <div className='authentication' onClick={()=>{props.setShowLogin(false)}}>
        <form action=""  onSubmit={(e)=>{submitHandler(e)}}  onClick={(e) => e.stopPropagation()} >
            <h1><span>User</span> {status} </h1>

            {status=='Sign Up' && <div className="box">
                <p>Name</p>
                <input type="text" name='name' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)} />
            </div>}
            
            <div className="box">
                <p>Email</p>
                <input type="text" name='email'  placeholder='Enter email ' value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="box">
                <p>Password</p>
                <input type="password" name='password' placeholder='Enter password'  value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>
            {status=='Login'?<p>Create an account? <button onClick={(e)=>{e.preventDefault();setStatus('Sign Up')}}>Sign Up</button></p>: <p>Already have account? <button onClick={(e)=>{e.preventDefault();setStatus('Login')}}>Login</button></p>}
           
            <button className='submit'>{loading?'Please wait':status}</button>
            </form>
    </div>
  )
}

export default Login