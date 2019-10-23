const User = require('../../models/user');
const Event = require('../../models/event');
const  { dateToString } = require('../../helpers/date');

const {
    transformEvent
} = require('./merge');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find();
            return events.map(event => {
                return transformEvent(event);

            });
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args, req) => {
        if(!req.isAuth) {
            throw new Error('Unauthorized');
        }
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: dateToString(args.eventInput.date),
            creator: '5da99ec0b4562d08284e7d8c'
        });
        let createdEvent;
        try {
            const result = await event.save();
            createdEvent = transformEvent(result);
            const creator = await User.findById('5da99ec0b4562d08284e7d8c');

            if (!creator) {
                throw new Error('User not found');
            }

            creator.createdEvents.push(event); // push to user createEvents array, mongoose will extract id from event object
            await creator.save();


            return createdEvent;
        } catch (err) {
            throw err;
        }
    }
}