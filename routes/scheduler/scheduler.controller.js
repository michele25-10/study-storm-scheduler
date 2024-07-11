const asyncHandler = require('express-async-handler');
const { listService } = require("../../enums/list-service");
const Cron = require('../../cron/cron');
const cron = require('node-cron');
//@desc avvia processi
//@route POST /api/scheduler/start
//@access public
const start = asyncHandler(async (req, res) => {

    Cron.clearTableResetPasswordCron.start();
    listService[0].active = true;
    Cron.clearTableUserVerificationCron.start();
    listService[1].active = true;

    res.json({ message: "Start" });
});

//@desc ferma processi
//@route POST /api/scheduler/start
//@access public
const stop = asyncHandler(async (req, res) => {
    Cron.clearTableResetPasswordCron.stop();
    listService[0].active = false;
    Cron.clearTableUserVerificationCron.stop();
    listService[1].active = false;

    res.json({ message: "Stop" });
});

//@desc lista dei processi
//@route GET /api/scheduler/
//@access public
const list = asyncHandler(async (req, res) => {
    res.json(listService);
});

module.exports = { start, stop, list }