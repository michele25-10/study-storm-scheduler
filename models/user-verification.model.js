const connFunction = require('../utils/executeMySql');
const moment = require('moment/moment');

const TABLE = "user_verification";

const UserVerification = {
    deleteExpiredAndConfirmUserVerification: async () => {
        const result = await connFunction.delete(
            TABLE,
            `verified='1' OR (verified='0' AND NOW() > DATE_ADD(date_created, INTERVAL 1 DAY))`,
            {},
        );
        return result;
    },
}

module.exports = UserVerification;