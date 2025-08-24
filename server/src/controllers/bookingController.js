import { bookingModel } from "../models/bookingModel.js";
import { carModel } from "../models/carModel.js";

const createBooking=async(req,res)=>{
   try {
     const userID=req.user;
     const {carID,picupDate,returnDate}=req.body;
     if(!carID|| !picupDate || !returnDate){
        return res.json({success:false,message:"All Fields Required"})
     }

     const curr=new Date().toISOString().split('T')[0]
     if(picupDate<curr){
        return res.json({success:false,message:"Pickup date must be today or later"});
     }

     if(returnDate<picupDate){
        return res.json({success:false,message:"Return date must be after pickup date"});
     }

     const car=await carModel.findById(carID);
     if(!car){
        return res.json({success:false,message:"Car Not Found"});
     }
     const bookingInfo=await bookingModel.create({whoBooked:userID,whoseBooked:car.owner,car:carID,picupDate,returnDate});
 
     if(!bookingInfo){
        return res.status(500).json({success:false,message:"Car Not Booked"}); 
     }
 
    return res.json({success:true,message:"Booking request sent",bookingInfo});
   } catch (error) {
    console.log("error in createBooking controller",error);
    res.status(500).json({success:false,message:error.message});
   }
}

const getUserBookings=async(req,res)=>{
    try{
        const userID=req.user;
        const bookings=await bookingModel.find({whoBooked:userID}).populate('car')
        res.json({success:true,message:"car fetched successfully",bookings})
    }catch(error){
        console.log("error in getUserBookings controller",error);
        res.status(500).json({success:false,message:error.message});
    }
}

const getOwnerBookings=async(req,res)=>{
    try {
        const userID=req.user;
        const bookings=await bookingModel.find({whoseBooked:userID}).populate('car');

        res.status(200).json({success:true,bookings});
        
    } catch (error) {
        console.log("error in manageBooking controller",error)
        res.status(500).json({success:false,message:error.message});
    }
}

const changeBookingStatus=async(req,res)=>{
    try {
        const userID=req.user
        const {bookingId,status}=req.body

        const booking=await bookingModel.findById(bookingId)
    
        if(!booking){
            return res.status(400).json({success:false,message:"Booking not found"});
        }
        
        if(String(userID)!==String(booking.whoseBooked)){
           return res.status(401).json({success:false,message:"unauthorised"})
        }

        if(status=='confirm'){
            let available=await checkAvailability(booking.car,booking.picupDate,booking.returnDate);
            if(!available){
                return res.json({success:false,message:"Car is already booked"})
            }
        }

        booking.status=status;
        await booking.save();

        return res.status(200).json({success:true,message:"Status changed successfully"})

    } catch (error) {
        console.log("error in changeBookingStattus",error)
        res.status(500).json({success:false,message:error.message})
    }
}

const checkAvailability=async(carID,picupDate,returnDate)=>{
    try {
        // [a1,a2] [b1,b2]
        // if((a1<b2) && (a2>b1))
        const bookings=await bookingModel.find({
            car:carID,
            status:"confirm",
            picupDate: {$lte: returnDate },
            returnDate: {$gte: picupDate }
        })

        // console.log(bookings);
        // console.log(bookings.length);
      
        if(bookings.length===0){
            return true;  //availble hai 
        }

        return false;
        
    } catch (error) {
       console.log("error in checkAvailabilty function ",error);
    }
}

const checkAvailabilityCar=async(req,res)=>{
    try {
        const {location,picupDate,returnDate}=req.body;
        
        //find all car by location
        //now check availablity of car 
        //return all available cars
        
        const allCars=await carModel.find({location});
        const carsf=await Promise.all(allCars.map(async(car)=>{
            let check=await checkAvailability(car._id,picupDate,returnDate)
            return check?car:null;
        }));

        const cars=carsf.filter((car)=>{if(car) return true})
        res.status(200).json({success:true,cars})
    } catch (error) {
        console.log("error in check availablity car controller",error);
        res.status(500).json({success:false,message:error.message})
    }
}

export {createBooking,getUserBookings,getOwnerBookings,changeBookingStatus,checkAvailabilityCar}