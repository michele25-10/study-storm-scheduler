const cron = require("node-cron");

const { clearTableUserVerification } = require("../cron-function/user-verification.function");
const { clearTableResetPassword } = require("../cron-function/reset-password.function");

let Cron = [
    {
        schedule: cron.schedule('* * * * * *', clearTableUserVerification, {
            scheduled: false,
            timezone: 'Europe/Rome',
            name: "clear-user-verification",
            recoverMissedExecutions: true,
        }),
        active: false,
        id: 1,
        name: "clear-user-verification"
    },
    {
        schedule:
            cron.schedule('* * * * * *', clearTableResetPassword, {
                scheduled: false,
                timezone: 'Europe/Rome',
                name: "clear-reset-password",
                recoverMissedExecutions: true,
            }),
        name: "clear-reset-password",
        active: false,
        id: 2,
    }
];



module.exports = Cron;  