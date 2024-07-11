const asyncHandler = require('express-async-handler');
const InviteTeam = require('../models/invite-team.model');

const clearTableInviteTeam = asyncHandler(async () => {
    const result = await InviteTeam.deleteExpiredAndVerifiedResetPassword();
    console.log("result clearTableInviteTeam: " + result);
});

module.exports = { clearTableInviteTeam };