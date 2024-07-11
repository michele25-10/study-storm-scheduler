const asyncHandler = require('express-async-handler');
const UserVerification = require('../models/user-verification.model');

// Schedule tasks to be run on the server.
const clearTableUserVerification = asyncHandler(async () => {
    const result = await UserVerification.deleteExpiredAndConfirmUserVerification();
    console.log("result clearTableUserVerification: " + result);
});

module.exports = { clearTableUserVerification };