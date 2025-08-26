import { carModel } from "../models/carModel.js";
import { userModel } from "../models/userModel.js"
import jwt from 'jsonwebtoken'
import { uploadImage } from "../utils/cloudinary.js";

const generateAccessToken=(userID)=>{
    return jwt.sign({id:userID},process.env.JWT_SECRET,{expiresIn:'7d'});
}

const registerUser=async (req,res)=>{
    try{
        const {name,email,password}=req.body
        if(!name || !email || !password){
            return res.json({success:false,message:"please fill all the filed"})
        }

        if(password.length<7){
            return res.json({succes:false,message:"password must be at least 7 characters"})
        }

        const userExist=await userModel.findOne({email});
        if(userExist){
            return res.json({success:false,message:"email id already registered"})
        }

        const user=await userModel.create({
            name,
            email,
            password
        })

        
        const accessToken=generateAccessToken(user._id)

        const options={
            httpOnly:true,
            secure:true,
            sameSite:'none',
            maxAge: 1000*60*60*24*7,
        }

        const userData=user.toObject();
        delete user.password;

        res
        .cookie('accessToken',accessToken,options)
        .json({success:true,message:"user Registered succesfully",userData})

   }catch(error){
        console.log("register error",error)
        res.json({success:false,message:error.message})
    }
}

const loginUser=async (req,res)=>{
    //find user by email if not found send error 
    //check password is correct or not
    //generate access token refres token store in cookies
    //put refersh token on database 

    try{
        const {email,password}=req.body
        const user=await userModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"user not found"})
        }
        
        const isPasswordCorrect=await user.isPasswordCorrect(password);
        if(!isPasswordCorrect){
            return res.json({success:false,message:"Incorrect Password"})
        }

        const accessToken=generateAccessToken(user._id)
         const options={
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge: 1000*60*60*24*7,
        }
        
        const userData=user.toObject();
        delete user.password;
        
        res
        .cookie('accessToken',accessToken,options)
        .json({success:true,message:"login succesfully",userData})

    }catch(error){
        console.log("login error",error)
        res.json({success:false,message:error.message})
    }
}


const logoutUser=async(req,res)=>{
    try {
        const options={
            httpOnly:true,
            secure:true,
            sameSite:"none",
            maxAge:0
        }
    
        res
        .cookie("accessToken",null,options)
        .json({success:true,message:"Logout Sucessfully"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})      
    }
}


const getUserProfile=async(req,res)=>{
    
    try {
        const accessToken=req.cookies?.accessToken;
        if(!accessToken){
            return res.json({succes:false,message:"unauthorised"});
        }
        const decode=jwt.verify(accessToken,process.env.JWT_SECRET);
        const user=await userModel.findById(decode.id);

    
        const userData=user.toObject();
        delete user.password;
        
        
        if(!user){
            return res.json({success:false,message:"unauthorised"});
        }
    
        res.json({success:true,message:"user fetched sucessfully",userData})
    } catch (error) {
        console.log(error);
        return res.json({success:false,message:error.message})
    }
}


const previewCars=async(req,res)=>{
    try {
        const cars=await carModel.find({status:true}).limit(6);
        res.status(200).json({success:true,message:"Car Fetched Successfully",cars})
    } catch (error) {
        console.log("error in previewCars controler",error);
        res.status(500).json({success:false,message:error.message});
    }
}

const allCars=async(req,res)=>{
    try {
        const cars=await carModel.find({status:true});
        res.status(200).json({success:true,message:"Car Fetched Successfully",cars})
    } catch (error) {
        console.log("error in allCars controler",error);
        res.status(500).json({success:false,message:error.message});
    }
}


const getCar=async(req,res)=>{
    try {
        const carID=req.params.carID
        const car=await carModel.findById(carID);
        res.status(200).json({success:true,message:"car fetched successfully",car})
    } catch (error) {
        console.log("error in getCar controller ",error);
        res.status(500).json({success:false,message:error.message});
    }
}

const searchCar=async(req,res)=>{
    try {
        const {search}=req.body;
        const cars=await carModel.find({$or:[{brand:{$regex:search,$options:'i'}},{model:{$regex:search,$options:'i'}}]})
    
        return res.status(200).json({success:true,cars});

    } catch (error) {
        console.log("error un search Car controoler",error);
        res.status(500).json({success:false,message:error.message})
    }
}


const updateAvatar=async(req,res)=>{
    try {
        const userID=req.user;
        
        if(!req.file){
            return res.json({success:false,message:"please Upload File"})
        }

        const user=await userModel.findById(userID);

        const uploadResult=await uploadImage(req.file.buffer);
        if(!uploadResult){
            res.status(500).json({success:false,message:"Failed to upload file"})
        }

        user.avatar=uploadResult.url;
        await user.save({validateBeforeSave:false})
        
        const updatedUser=await userModel.findById(userID);
        const userData=updatedUser.toObject();
        delete userData.password

        res.json({success:true,userData,message:"Profile pic updated"})

    } catch (error) {
        console.log("error in update Avatar",error);
        res.status(500).json({success:false,message:error.message})
    }
}

export {registerUser,loginUser,logoutUser,getUserProfile,previewCars,allCars ,getCar,searchCar,updateAvatar}