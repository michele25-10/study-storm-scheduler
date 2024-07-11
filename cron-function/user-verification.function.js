const asyncHandler = require('express-async-handler');
const UserVerification = require('../models/user-verification.model');
//const { writeTerminal } = require('../middleware/writeTerminal');

// Schedule tasks to be run on the server.
const clearTableUserVerification = asyncHandler(async () => {
    const result = await UserVerification.deleteExpiredAndConfirmUserVerification();
    console.log("result clearTableUserVerification: " + result);
});
/*cron.schedule('* * * * *', async function () {
    const result = await UserVerification.deleteExpiredAndConfirmUserVerification();
    writeTerminal({ message: "Pulizia tabella user_verification", affectedRows: result.affectedRows, nameFunction: "clearTableUserVerification" });
});*/

module.exports = { clearTableUserVerification };