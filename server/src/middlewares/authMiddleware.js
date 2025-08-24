import jwt from 'jsonwebtoken'
import { userModel } from '../models/userModel.js';

const auth=async (req,res,next)=>{
    let accessToken=req.cookies?.accessToken;
    
    if(!accessToken){
        res.json({success:false,message:"unauthorised token"})
    }

    const decoded=jwt.verify(accessToken,process.env.JWT_SECRET)
    const userID=decoded.id;
    const user=await userModel.findById(userID);
    if(!user){
        res.json({success:false,message:"unauthorised auth"})
    }
    
    req.user=user._id;
    
    next();
}

export {auth}