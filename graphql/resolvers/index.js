const eventResolvers = require('./event');
const bookingResolvers = require('./booking');
const authResolvers = require('./auth');

const roolResolver = {
    ...eventResolvers,
    ...bookingResolvers,
    ...authResolvers
};

module.exports = roolResolver;