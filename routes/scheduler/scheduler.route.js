const express = require('express');
const router = express.Router();

const schedulerController = require('./scheduler.controller');
const schedulerValidation = require('./scheduler.validation');
const validate = require('../../middleware/JoiValidation');

//reload o start dei processi
router.post("/start/", validate(schedulerValidation.start), schedulerController.start);

//ferma i processi attivi
router.post("/stop/", validate(schedulerValidation.stop), schedulerController.stop);


module.exports = router;