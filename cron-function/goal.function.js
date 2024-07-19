const asyncHandler = require('express-async-handler');
const moment = require('moment');

const { writeTerminal } = require('../utils/writeTerminal');

const Goal = require('../models/goal.model');

const sendMailer = require('../utils/mail');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

const expiredGoals = asyncHandler(async () => {
    const result = await Goal.expiredGoals();
    for (const row of result) {
        const template = handlebars.compile(fs.readFileSync(path.join(__dirname, "../templates/expiredGoal.html")).toString());

        const replacements = {
            name: row.name,
            surname: row.surname,
            daysToExpiry: row.days_to_expiry,
            goalName: row.goal_name,
            expiryDate: moment(row.expiry_date).format('DD/MM/YYYY'),
        };

        await sendMailer({
            from: process.env.MAIL,
            to: row.email,
            subject: `Study Storm: "${row.goal_name}" la scadenza si avvicina!`,
            body: "",
            html: template(replacements)
        });
    }
    writeTerminal({
        error: false,
        id: 5,
        name: "expired-goals"
    });
});

module.exports = { expiredGoals };