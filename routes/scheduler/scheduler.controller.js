const asyncHandler = require('express-async-handler');
const Cron = require('../../cron/cron');
//@desc avvia processi
//@route POST /api/scheduler/start
//@access public
const start = asyncHandler(async (req, res) => {
    for (const row of Cron) {
        row.schedule.start();
        row.active = true;
    }

    res.json({ message: "Start" });
});

//@desc ferma processi
//@route POST /api/scheduler/start
//@access public
const stop = asyncHandler(async (req, res) => {
    for (const row of Cron) {
        row.schedule.stop();
        row.active = false;
    }

    res.json({ message: "Stop" });
});

//@desc lista dei processi
//@route GET /api/scheduler/
//@access public
const list = asyncHandler(async (req, res) => {
    let response = {};
    for (const row of Cron) {
        response[row.name] = row.active;
    }
    res.json(response);
});

module.exports = { start, stop, list }