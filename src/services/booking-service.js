const BookingRepository = require("../repository/booking-repository");
const { REMINDER_BINDING_KEY } = require("../config/serverConfig");
const { createChannel, publishMessage } = require("../utils/messageQueue");
const axios = require("axios");
const {
  FLIGHT_SERVICE_PATH,
  REMINDER_SERVICE_PATH,
  AUTH_SERVICE_PATH,
} = require("../config/serverConfig");
const ServiceError = require("../utils/error/service-error");
class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      // console.log(data.userId);
      const getAuthRequestUrl = `${AUTH_SERVICE_PATH}/api/v1/${data.userId}`;

      const userData = await axios.get(getAuthRequestUrl);
      if (!userData.data.data) {
        throw "This user not found";
      }
      const userEmail = userData.data.data.email;

      const flightId = data.flightId;
      const getFlightRequestUrl = `${FLIGHT_SERVICE_PATH}/api/v1/flight/${flightId}`;

      const response = await axios.get(getFlightRequestUrl);
      const flightData = response.data.data;

      const priceOfTheFlight = flightData.price;

      const noOfSeats = data.noOfSeats !== undefined ? data.noOfSeats : 1;
      const totalCost = priceOfTheFlight * noOfSeats;

      if (noOfSeats > flightData.totalSeats) {
        throw new ServiceError(
          "Something went wrong in the booking process",
          "Insufficient seats in the flight"
        );
      }

      const bookingPayload = { ...data, totalCost };

      const booking = await this.bookingRepository.createBooking(
        bookingPayload
      );

      await axios.patch(getFlightRequestUrl, {
        totalSeats: flightData.totalSeats - booking.noOfSeats,
      });

      const finalBooking = await this.bookingRepository.update(booking.id, {
        status: "Booked",
      });

      if (finalBooking.status == "Booked") {
        const channel = await createChannel();

        const payload = {
          data: {
            subject: "Congratulations you ticket is Booked",
            content: "your flight number is A",
            recepientEmail: userEmail,
            notificationTime: "2025",
          },
          service: "SEND_BASIC_EMAIL",
        };
        // console.log(JSON.stringify(payload, null, 2));

        publishMessage(
          channel,
          REMINDER_BINDING_KEY,
          JSON.stringify(payload, null, 2)
        );
      }

      return finalBooking;
    } catch (error) {
      if (error.name == "RepositoryError" || error.name == "ValidationError") {
        throw error;
      }
      throw error;
    }
  }
}

module.exports = BookingService;
