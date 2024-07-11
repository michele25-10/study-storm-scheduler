const connFunction = require('../utils/executeMySql');

const TABLE = "invite_team";

const InviteTeam = {
    deleteExpiredAndVerifiedResetPassword: async () => {
        const result = await connFunction.delete(
            TABLE,
            `verified='1' OR (verified='0' and date_created < DATE_SUB(NOW() , INTERVAL 30 DAY))`,
            {},
        );
        return result;
    },
}

module.exports = InviteTeam;