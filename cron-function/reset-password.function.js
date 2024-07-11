const asyncHandler = require('express-async-handler');
const ResetPassword = require('../models/reset-password.model');
//const writeTerminal = require('../middleware/writeTerminal');

const clearTableResetPassword = asyncHandler(async () => {
    console.log("clearTableResetPassword");

    /*const result = await ResetPassword.deleteExpiredAndVerifiedResetPassword();
    writeTerminal({ message: "Pulizia tabella reset_password", affectedRows: result.affectedRows, nameFunction: "clearTableResetPassword" });*/
});

module.exports = { clearTableResetPassword };