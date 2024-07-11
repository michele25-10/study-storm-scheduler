const asyncHandler = require('express-async-handler');
const ResetPassword = require('../models/reset-password.model');

const clearTableResetPassword = asyncHandler(async () => {
    const result = await ResetPassword.deleteExpiredAndVerifiedResetPassword();
    console.log("result clearTableResetPassword: " + result);
});

module.exports = { clearTableResetPassword };