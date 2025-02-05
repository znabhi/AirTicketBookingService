const BookingService = require("../services/booking-service");

const bookingService = new BookingService();

const { createChannel, publishMessage } = require("../utils/messageQueue");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");

const sendMessageToQueue = async (req, res) => {
  try {
    const channel = await createChannel();
    const data = { message: "Success" };
    publishMessage(channel, REMINDER_BINDING_KEY, JSON.stringify(data));
    return res.status(200).json({
      message: "successfully published the event",
    });
  } catch (error) {
    throw error;
  }
};

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
    console.log(error);

    return res.status(500).json({
      data: null,
      success: false,
      message: error.message,
      error: error,
    });
  }
};

module.exports = {
  createBooking,
  sendMessageToQueue,
};
