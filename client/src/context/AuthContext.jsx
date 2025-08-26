import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'


const AuthContext= createContext();

const AuthContextProvider=({children})=>{

    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const [cars,setCars]=useState([]);
    const [search,setSearch]=useState('');
    const [test,setTest]=useState(false);

    const loginUser=(userData)=>{
        setUser(userData);
    }

    const updateImage=(newavatar)=>{
        if(user){
            setUser((prevUser)=>({...prevUser,avatar:newavatar}))
        }
    }

    const logout=async ()=>{
        const endPoint=`${import.meta.env.VITE_BACKEND_URL}/api/user/logout`;
        const {data}=await axios.post(endPoint,{},{withCredentials:true})

        if(data.success){
            toast.success(data.message);
            setUser(null);
        }else{
            toast.error(data.message);
        }
    }


    useEffect(()=>{
        const fetchUser=async()=>{
            const endPoint=`${import.meta.env.VITE_BACKEND_URL}/api/user/getUser`;
            const {data}=await axios.get(endPoint,{withCredentials:true});
            if(data.success){
                setUser(data.userData);
            }
            setLoading(false);
        }
        fetchUser();
    },[])



    const getDays=(picupDate,returnDate)=>{
        const start=new Date(picupDate);
        const end=new Date(returnDate);

        const days=Math.ceil((end-start)/(1000*60*60*24))+1;
        return days;
    }

    return(
    <AuthContext.Provider value={{user,loginUser,logout,getDays,loading,cars,setCars,search,setSearch,test,setTest,updateImage}}>
        {children}
    </AuthContext.Provider>
    )
}

const useAuth= ()=>useContext(AuthContext)

export {AuthContext,AuthContextProvider,useAuth}