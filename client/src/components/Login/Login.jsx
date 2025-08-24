import React, {useState } from 'react'
import './Login.css'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext.jsx'
// import { useLocation } from 'react-router-dom';
// import { useEffect } from 'react';

const Login = (props) => {

    const [status,setStatus]=useState("Login");

    const [name,setName]=useState('');
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('');
    
    //testing code block
    // const location=useLocation();
    // useEffect(()=>{
    //     console.log(location);
    // },[])
    const {user,loginUser}=useAuth();
    
    const submitHandler=async(e)=>{
        e.preventDefault();

        const endpoint=status=='Login'?`${import.meta.env.VITE_BACKEND_URL}/api/user/login`:`${import.meta.env.VITE_BACKEND_URL}/api/user/register`;
        const userData={name,email,password};
        // console.log(userData ,endpoint);
        const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // this allows cookies like accessToken to be stored
        body: JSON.stringify(userData),
      });
      const ans=await res.json();
      console.log(res);
      console.log(ans);
      if(ans.success){
        toast.success(ans.message);
        loginUser(ans.userData);
        props.setShowLogin(false);
        console.log(user);
      }else{
         toast.error(ans.message);
      }
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
           
            <button className='submit'>{status}</button>
            </form>
    </div>
  )
}

export default Login