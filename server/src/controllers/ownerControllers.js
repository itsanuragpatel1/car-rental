import { bookingModel } from "../models/bookingModel.js";
import { carModel } from "../models/carModel.js";
import { uploadImage } from "../utils/cloudinary.js";
import fs from 'fs'


const addCar=async(req,res)=>{
    try {
        const userID=req.user;
        const parsed=JSON.parse(req.body.carData);
        const {brand,model,year,price,category,transmission,fuelType,capacity,location,description}=parsed;
        
        if(!brand || !model || !year || !price || !category || !transmission || !fuelType || !capacity || !location || !description){
            return res.json({succes:false , message:"Please fill all fields"});
        }
        
        if(!req.file){
            return res.json({success:false,message:"Upload Car Image"})
        }
        
        const carImage=await uploadImage(req.file.buffer);

        if(!carImage){
            return res.status(500).json({success:false,message:"Failed to upload file"})
        }

        const carInfo=await carModel.create({carImage:carImage.url,brand,model,year,price,category,transmission,fuelType,capacity,location,description,owner:userID});
        
        if(!carInfo){
            return res.json({success:false,message:"Car adding failed"});
        }

        res.json({success:true,message:"Car added successfully"})
    } catch (error) {
        console.log("error in addCar controller", error)
        res.status(500).json({success:false,message:error.message});  
    }
}


const myCars=async(req,res)=>{
    try {
        const userID=req.user;
        const cars=await carModel.find({owner:userID});
    
        res.json({success:true,cars});
    } catch (error) {
        console.log("error in myCars controller",error)
        res.status(500).json({success:false,message:error.message});
    }
}



const deleteCar=async(req,res)=>{
    try {
        const carID=req.params.carID;
        await carModel.findByIdAndDelete(carID);
    
        res.status(200).json({success:true,message:"Car Deleted Successfully"});
    } catch (error) {
        console.log("error in deleteCar controller",error);
        res.status(500).json({success:false,message:error.message});
    }
}

const changeStatus=async(req,res)=>{
    try {
        const carID=req.params.carID;
        const car=await carModel.findById(carID);
        if(!car){
            res.status(400).json({success:false,message:"Car Not Found"})
        }
        const status=car.status;
        const updatedCar=await carModel.findByIdAndUpdate(carID, {$set:{status:!status}},{new:true})

        res.status(200).json({success:true,message: "Status updated", data: updatedCar})
    } catch (error) {
        console.log("error in changeStatus controller",error);
        res.status(500).json({success:false,message:error.message})
    }
}

    const getDashboard=async(req,res)=>{
    try {
        const userID=req.user;

        const now=new Date();

        const totalCars=await carModel.find({owner:userID}).countDocuments();
        const totalBookings=await bookingModel.find({whoseBooked:userID}).countDocuments();
        const pendingBookings=await bookingModel.find({whoseBooked:userID,status:'pending'}).countDocuments();
        const completedBookings=await bookingModel.find({whoseBooked:userID,status:'confirm',returnDate:{$lte:now}}).countDocuments();
        
        const startDate=new Date(now);
        startDate.setMonth(startDate.getMonth()-1);

        const monthlyRevenue=await bookingModel.aggregate([
            {
                $match:{
                    whoseBooked:userID,
                    status:'confirm',
                    picupDate:{$gte:startDate,$lte:now}
                }
            },
            {
                $lookup:{
                    from:'cars',
                    localField:'car',
                    foreignField:'_id',
                    as:'car'
                }
            },
            {
                $unwind:'$car'
            },
            {
                $addFields:{
                    rentalDays:{
                        $add:[{$divide:[{$subtract:["$returnDate","$picupDate"]},1000*60*60*24]},1 ]
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: {
                        $sum: { $multiply: ['$rentalDays', '$car.price'] }
                    }
                }
            }
        ])
        const totalRevenue=monthlyRevenue[0]?.totalRevenue || 0;
        
        const recentBookings=await bookingModel.find({whoseBooked:userID}).sort({createdAt: -1}).limit(6).populate('car','brand model price');
        
        const dashboard={totalCars,totalBookings,pendingBookings,completedBookings,monthlyRevenue:totalRevenue,recentBookings};
        res.status(200).json({success:true,dashboard});
    } catch (error) {
        console.log("error in get dashboard",error);
        res.status(500).json({success:false,message:error.message})
    }

}


export {addCar,myCars,deleteCar,changeStatus,getDashboard}