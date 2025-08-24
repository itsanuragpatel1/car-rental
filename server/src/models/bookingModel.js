import mongoose from "mongoose";


const bookingSchema=new mongoose.Schema({
    whoBooked:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'user',
        required:true
    },
    whoseBooked:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:"user",
        required:true
    },
    picupDate:{
        type:Date,
        required:true
    },
    returnDate:{
        type:Date,
        required:true
    },
    car:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'car',
        required:true
    },
    status:{
        type:String,
        default:"pending"        
    }
},{timestamps:true})

const bookingModel=mongoose.model('booking',bookingSchema);

export {bookingModel}