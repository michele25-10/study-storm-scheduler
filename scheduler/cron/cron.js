const cron = require("node-cron");

const { listServices } = require("../enums/list-service");
const { clearTableUserVerification } = require("../controller/user-verification.controller");

const clearTableUserVerificationCron = cron.schedule('* * * * * *', clearTableUserVerification, {
    scheduled: false,
    timezone: 'Europe/Rome',
    name: listServices[0].name,
    recoverMissedExecutions: true,
});

module.exports = { clearTableUserVerificationCron }