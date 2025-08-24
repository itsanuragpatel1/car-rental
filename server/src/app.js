import express from "express"
import userRoutes  from './routes/userRoutes.js'
import ownerRoutes from './routes/ownerRoutes.js'
import bookingRoutes from './routes/bookingRoutes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app=express();

app.use(cors({
  origin:['http://localhost:5173','https://car-rental-client-beta.vercel.app'] ,  
  credentials: true                // allow cookies
}));
// app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

app.use('/api/user',userRoutes)
app.use('/api/owner',ownerRoutes)
app.use('/api/booking',bookingRoutes)

export {app}