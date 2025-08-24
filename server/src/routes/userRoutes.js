import express from "express"
import { allCars, getCar, getUserProfile, loginUser, logoutUser, previewCars, registerUser, searchCar, updateAvatar } from "../controllers/userControllers.js"
import { auth } from "../middlewares/authMiddleware.js"
import { upload } from "../middlewares/multerMiddleware.js"

const router=express.Router()

router.post('/register',registerUser)
router.post('/login',loginUser)
router.get('/logout',logoutUser)
router.get('/getUser',getUserProfile)
router.get('/preview-cars',previewCars)
router.get('/all-cars',allCars)
router.get('/get-car/:carID',getCar)
router.post('/search',searchCar)
router.post('/avatar-update',auth,upload.single('avatar'),updateAvatar)

export default router