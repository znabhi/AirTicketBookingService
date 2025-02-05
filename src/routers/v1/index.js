const express = require("express");
const BookingController = require("../../controllers/booking-controller");
const router = express.Router();

router.post("/booking", BookingController.createBooking);
router.post("/publish", BookingController.sendMessageToQueue);

module.exports = router;
