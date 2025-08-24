import express from "express";
import { auth } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/multerMiddleware.js";
import { addCar, changeStatus, deleteCar, myCars, getDashboard } from "../controllers/ownerControllers.js";


const router=express.Router();

// router.get('/dashboard',dashboard);
router.post('/add-car', auth , upload.single('image') , addCar);
router.get('/my-cars',auth ,myCars)
router.get('/change-status/:carID',auth,changeStatus)
router.get('/delete/:carID',auth,deleteCar)
router.get('/dashboard',auth,getDashboard)



export default router