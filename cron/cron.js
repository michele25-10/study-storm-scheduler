const cron = require("node-cron");

const { clearTableUserVerification } = require("../cron-function/user-verification.function");
const { clearTableResetPassword } = require("../cron-function/reset-password.function");
const { listService } = require("../enums/list-service");

const Cron = {
    clearTableUserVerificationCron: cron.schedule('* * * * * *', clearTableUserVerification, {
        scheduled: false,
        timezone: 'Europe/Rome',
        name: listService[0].name,
        recoverMissedExecutions: true,
    }),
    clearTableResetPasswordCron: cron.schedule('* * * * * *', clearTableResetPassword, {
        scheduled: false,
        timezone: 'Europe/Rome',
        name: listService[1].name,
        recoverMissedExecutions: true,
    }),
}



module.exports = Cron;  