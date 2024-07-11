const asyncHandler = require('express-async-handler');
const UserVerification = require('../models/user-verification.model');
const { writeTerminal } = require('../utils/writeTerminal');

// Schedule tasks to be run on the server.
const clearTableUserVerification = asyncHandler(async () => {
    const result = await UserVerification.deleteExpiredAndConfirmUserVerification();
    writeTerminal({
        error: false,
        id: 0,
        name: "clear-user-verification"
    });
});

module.exports = { clearTableUserVerification };