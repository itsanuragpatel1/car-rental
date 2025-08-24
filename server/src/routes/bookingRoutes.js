import { Router } from "express";
import { changeBookingStatus, checkAvailabilityCar, createBooking, getOwnerBookings, getUserBookings } from "../controllers/bookingController.js";
import { auth } from "../middlewares/authMiddleware.js";

const router=Router();

router.post('/create',auth,createBooking);
router.get('/user',auth,getUserBookings);
router.get('/owner',auth,getOwnerBookings);
router.post('/status',auth,changeBookingStatus);
router.post('/check-availbilty',checkAvailabilityCar);

export default router;