const express = require('express');
const router = express.Router();
const validateToken = require('./../middleware/validateToken');

//Rotte senza token
router.use("/auth", require("./auth/auth.route"))

//Rotte con token
router.all('*', validateToken);
router.use("/health", require("./health/health.route"));

module.exports = router;