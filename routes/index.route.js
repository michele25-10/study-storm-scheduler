const express = require('express');
const router = express.Router();

router.use("/auth", require("./login/login.route"))

router.use("/health", require("./health/health.route"));

module.exports = router;