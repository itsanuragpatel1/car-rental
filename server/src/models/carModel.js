import mongoose, { mongo } from "mongoose";

const carSchema=new mongoose.Schema({
    carImage:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        trim:true,
        required:true
    },
    model:{
        type:String,
        trim:true,
        required:true
    },
    year:{
        type:Number,
        trim:true,
        required:true
    },
    price:{
        type:Number,
        trim:true,
        required:true
    },
    category:{
        type:String,
        trim:true,
        required:true   
    },
    transmission:{
        type:String,
        trim:true,
        required:true
    },
    fuelType:{
        type:String,
        trim:true,
        required:true
    },
    capacity:{
        type:Number,
        trim:true,
        required:true
    },
    location:{
        type:String,
        trim:true,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    owner:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user",
    },
    status:{
        type:Boolean,
        default:true
    }

},{timestamps:true})


const carModel=mongoose.model('car',carSchema);

export {carModel}