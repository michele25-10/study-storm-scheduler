const asyncHandler = require('express-async-handler');
const ResetPassword = require('../models/reset-password.model');
const { writeTerminal } = require('../utils/writeTerminal');

const clearTableResetPassword = asyncHandler(async () => {
    const result = await ResetPassword.deleteExpiredAndVerifiedResetPassword();
    writeTerminal({
        error: false,
        id: 1,
        name: "clear-reset-password"
    });
});

module.exports = { clearTableResetPassword };