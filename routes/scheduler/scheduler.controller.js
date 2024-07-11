const asyncHandler = require('express-async-handler');

//@desc avvia processi
//@route POST /api/scheduler/start
//@access public
const start = asyncHandler(async (req, res) => {
    console.log(req.body);
});

//@desc ferma processi
//@route POST /api/scheduler/start
//@access public
const stop = asyncHandler(async (req, res) => {
    console.log(req.body);
});

module.exports = { start, stop }