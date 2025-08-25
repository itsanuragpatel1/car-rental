import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'

const uploadImage=async(fileBuffer)=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })

    // try{
    //     const uploadResult=await cloudinary.uploader.upload(filePath,{folder:'carRental'});
    //     // console.log(uploadResult)
    //     return uploadResult;
    // }catch(error){
    //     console.log("upload error" , error);
    // }

    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: 'carRental' },
            (error, result) => {
                if (error) reject(error);
                else resolve(result);
            }
        );
        
        streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });

}

export {uploadImage}