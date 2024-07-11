const asyncHandler = require('express-async-handler');
const InviteTeam = require('../models/invite-team.model');
const { writeTerminal } = require('../utils/writeTerminal');

const clearTableInviteTeam = asyncHandler(async () => {
    const result = await InviteTeam.deleteExpiredAndVerifiedResetPassword();
    writeTerminal({
        error: false,
        id: 2,
        name: "clear-invite-team"
    });
});

module.exports = { clearTableInviteTeam };