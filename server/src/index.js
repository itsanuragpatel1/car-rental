import { connectDB } from './config/db.js'
import { app } from './app.js';
import dotenv from 'dotenv'

dotenv.config()

const PORT=process.env.PORT || 3000;


connectDB()
.then(()=>{
    console.log("database connected"),
    app.listen(PORT,()=>{
        console.log("server connected");
    })
    }  
).catch((err)=>{
    console.log(err)
} )