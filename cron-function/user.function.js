const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const sendMailer = require('../utils/mail');

const disclaimarObsessionatedStudent = asyncHandler(async () => {
    const result = await User.obsessionatedStudent();
    for (const row of result) {
        const template = handlebars.compile(fs.readFileSync(path.join(__dirname, "../templates/disclaimarObessessionatedStudent.html")).toString());

        const replacements = {
            name: row.name,
            surname: row.surname,
            hour: Math.floor(row.value / 60),
        };

        await sendMailer({
            from: process.env.MAIL,
            to: row.email,
            subject: "Study Storm: Ricordati che la concentrazione è come un muscolo!",
            body: "",
            html: template(replacements)
        });
    }
    console.log("result disclaimarObsessionatedStudent: " + result);
});

module.exports = { disclaimarObsessionatedStudent };