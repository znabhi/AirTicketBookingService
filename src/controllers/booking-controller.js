const BookingService = require("../services/booking-service");

const bookingService = new BookingService();

const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;
    const booking = await bookingService.createBooking(bookingData);
    return res.status(201).json({
      data: booking,
      success: true,
      message: "Booking created successfully.",
      error: null,
    });
  } catch (error) {
    return res.status(error.statusCode).json({
      data: null,
      success: false,
      message: error.message,
      error: error.explanation,
    });
  }
};

module.exports = {
  createBooking,
};
