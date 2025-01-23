const BookingRepository = require("../repository/booking-repository");

class BookingService {
  constructor() {
    this.bookingRepository = new BookingRepository();
  }

  async createBooking(data) {
    try {
      const booking = await this.bookingRepository.createBooking(data);
      return booking;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BookingService;
