import mongoose from "mongoose"
import bcrypt from 'bcrypt'

const userSchema=new mongoose.Schema({
    name:{
        type: String,
        trim:true,
        required:true
    },
    avatar:{
        type:String,
    },
    email:{
        type: String,
        trim:true,
        required:true,
        unique:true,
        index:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
    },
    refreshToken:{
        type:String,
    }
    
},{timestamps:true});

userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();

    this.password=await bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    const isMatch=await bcrypt.compare(password,this.password)
    return isMatch
}

const userModel=mongoose.model("user",userSchema);

export {userModel}