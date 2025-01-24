const express = require("express");
const BookingController = require("../../controllers/booking-controller");
const router = express.Router();

router.post("/booking", BookingController.createBooking);
// router

module.exports = router;
