const Booking = require('../../models/booking');
const Event = require('../../models/event');
const {
    transformBooking,
    transformEvent
} = require('./merge');

module.exports = {
    bookings: async () => {
        try {
            const bookings = await Booking.find();

            return (bookings.map(booking => {
                return transformBooking(booking);
            }))
        } catch (err) {
            throw err;
        }
    },
    bookEvent: async args => {
        const fetchedEvent = await Event.findOne({
            _id: args.eventId
        });
        const booking = new Booking({
            user: '5da99ec0b4562d08284e7d8c',
            event: fetchedEvent
        });
        const result = await booking.save();
        return transformBooking( result);
    },
    cancelBooking: async args => {
        try {
            const fetchedBooking = await Booking.findById(args.bookingId).populate('event');
            const event = transformEvent(fetchedBooking.event);
            await Booking.deleteOne(fetchedBooking);
            return event;
        } catch (err) {
            throw err;
        }


    }
}