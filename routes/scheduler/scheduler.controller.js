const asyncHandler = require('express-async-handler');
const { listService } = require("../../enums/list-service");
const Cron = require('../../cron/cron');

//@desc avvia processi
//@route POST /api/scheduler/start
//@access public
const start = asyncHandler(async (req, res) => {

    Cron.clearTableResetPasswordCron.start();
    Cron.clearTableUserVerificationCron.start();

    res.json({ message: "Start" });
});

//@desc ferma processi
//@route POST /api/scheduler/start
//@access public
const stop = asyncHandler(async (req, res) => {
    Cron.clearTableResetPasswordCron.stop();
    Cron.clearTableUserVerificationCron.stop();

    res.json({ message: "Stop" });
});

module.exports = { start, stop }