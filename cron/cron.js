const cron = require("node-cron");

const { clearTableUserVerification } = require("../cron-function/user-verification.function");
const { clearTableResetPassword } = require("../cron-function/reset-password.function");
const { clearTableInviteTeam } = require("../cron-function/invite-team.function");

let Cron = [
    {
        schedule: cron.schedule('*/5 * * * * *', clearTableUserVerification, {
            scheduled: false,
            timezone: 'Europe/Rome',
            name: "clear-user-verification",
            recoverMissedExecutions: false,
        }),
        active: false,
        id: 0,
        name: "clear-user-verification"
    },
    {
        schedule:
            cron.schedule('*/5 * * * * *', clearTableResetPassword, {
                scheduled: false,
                timezone: 'Europe/Rome',
                name: "clear-reset-password",
                recoverMissedExecutions: false,
            }),
        name: "clear-reset-password",
        active: false,
        id: 1,
    },
    {
        schedule:
            cron.schedule('*/5 * * * * *', clearTableInviteTeam, {
                scheduled: false,
                timezone: 'Europe/Rome',
                name: "clear-reset-password",
                recoverMissedExecutions: false,
            }),
        name: "clear-invite-team",
        active: false,
        id: 2,
    }
];



module.exports = Cron;  