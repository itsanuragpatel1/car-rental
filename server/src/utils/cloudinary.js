import { v2 as cloudinary } from 'cloudinary';

const uploadImage=async(filePath)=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })

    try{
        const uploadResult=await cloudinary.uploader.upload(filePath,{folder:'carRental'});
        // console.log(uploadResult)
        return uploadResult;
    }catch(error){
        console.log("upload error" , error);
    }
}

export {uploadImage}