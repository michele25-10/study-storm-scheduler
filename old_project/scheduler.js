const schedule = require('node-schedule');
require('dotenv').config();

// import function
const UserVerification = require('./function/user-verification.function');
const ResetPassword = require('./function/reset-password.function');

//task scheduler 
schedule.scheduleJob('0 */6 * * *', () => UserVerification.clearTableUserVerification()); //ogni 6 ore

schedule.scheduleJob('*/15 * * * *', () => ResetPassword.clearTableResetPassword()); //ogni 30 minuti



