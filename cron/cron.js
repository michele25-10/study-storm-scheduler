const cron = require("node-cron");

const { clearTableUserVerification } = require("../cron-function/user-verification.function");
const { clearTableResetPassword } = require("../cron-function/reset-password.function");
const { clearTableInviteTeam } = require("../cron-function/invite-team.function");
const { disclaimarObsessionatedStudent, inactiveUser } = require("../cron-function/user.function");
const { expiredGoals, teamComponentsAgenda } = require("../cron-function/goal.function");
const { backupDatabase } = require("../cron-function/backup-database");

let Cron = [
    {
        schedule: cron.schedule('0 */6 * * *', clearTableUserVerification, {
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
            cron.schedule('0 */6 * * *', clearTableResetPassword, {
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
            cron.schedule('0 */6 * * *', clearTableInviteTeam, {
                scheduled: false,
                timezone: 'Europe/Rome',
                name: "clear-reset-password",
                recoverMissedExecutions: false,
            }),
        name: "clear-invite-team",
        active: false,
        id: 2,
    },
    {
        schedule:
            cron.schedule('0 20 * * *', disclaimarObsessionatedStudent, {
                scheduled: false,
                timezone: 'Europe/Rome',
                name: "obsessionated-student",
                recoverMissedExecutions: false,
            }),
        name: "obsessionated-student",
        active: false,
        id: 3,
    },
    {
        schedule:
            cron.schedule('0 20 * * *', inactiveUser, {
                scheduled: false,
                timezone: 'Europe/Rome',
                name: "inactive-user",
                recoverMissedExecutions: false,
            }),
        name: "inactive-user",
        active: false,
        id: 4,
    },
    {
        schedule:
            cron.schedule('0 8 * * *', expiredGoals, {
                scheduled: false,
                timezone: 'Europe/Rome',
                name: "expired-goals",
                recoverMissedExecutions: false,
            }),
        name: "expired-goals",
        active: false,
        id: 5,
    },
    {
        schedule:
            cron.schedule('0 20 * * *', teamComponentsAgenda, {
                scheduled: false,
                timezone: 'Europe/Rome',
                name: "team-components-agenda",
                recoverMissedExecutions: false,
            }),
        name: "team-components-agenda",
        active: false,
        id: 6,
    },
    {
        //ogni domeninca mattina alle ore 2:00 AM '0 2 * * 0'
        schedule:
            cron.schedule('*/10 * * * * *', backupDatabase, {
                scheduled: false,
                timezone: 'Europe/Rome',
                name: "backup-database",
                recoverMissedExecutions: false,
            }),
        name: "backup-database",
        active: false,
        id: 7,
    }
];



module.exports = Cron;  