const connFunction = require('../utils/executeMySql');

const TABLE = "reset_password";

const ResetPassword = {
    deleteExpiredAndVerifiedResetPassword: async () => {
        const result = await connFunction.delete(
            TABLE,
            `verified='1' OR (verified = '0' and NOW() > DATE_ADD(date_created, INTERVAL 1 HOUR))`,
            {},
        );
        return result;
    },
}

module.exports = ResetPassword;