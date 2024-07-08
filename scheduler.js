const schedule = require('node-schedule');
require('dotenv').config();

// import function
const UserVerification = require('./function/user-verification.function');

//task scheduler 
schedule.scheduleJob('0 */6 * * *', () => UserVerification.clearTableUserVerification()); //ogni 6 ore



