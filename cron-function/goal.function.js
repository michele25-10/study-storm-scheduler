const asyncHandler = require('express-async-handler');
const moment = require('moment');

const { writeTerminal } = require('../utils/writeTerminal');

const Goal = require('../models/goal.model');
const Agenda = require('../models/agenda.model');

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

const teamComponentsAgenda = asyncHandler(async () => {
    const result = await Goal.selectIdGoalOfTeam();
    for (const row of result) {
        const dataAdmin = await Goal.selectAdminTeam({ id_goal: row.id_goal });
        const teamAgenda = await Agenda.teamComponentsAgenda({ id_goal: row.id_goal });

        //se qualcuno del team ha fatto qualcosa allora invio mail al capogruppo
        if (teamAgenda.length > 0) {

            let html = `
            <!DOCTYPE html>
                <html lang="it">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Agenda del team</title>
                </head>
                <body>
                <h1 class="title" style="color: violet; font-size: 32px; font-weight: bold">
                    Resoconto giornaliero del team!
                </h1>
                <div
                    class="paragraph"
                    style="margin-top: 20px; margin-bottom: 20px; color: black"
                >
                <p>Buongiorno ${dataAdmin.name} ${dataAdmin.surname},</p>
                <p>
                    Ti forniamo il resoconto giornaliero del tuo team per il progetto/esame
                    ${dataAdmin.goal_name}:
                </p>
                <ul>`;

            for (const element of teamAgenda) {
                html += `<li><b>${element.name} ${element.surname}</b>: ${element.note} <i>(${element.minutes} minuti)</i></li>`;
            }
            html += `
                </ul>      
                <p>Buon proseguimento di serata.</p>
                </div>
                </body>
                </html>`;

            await sendMailer({
                from: process.env.MAIL,
                to: dataAdmin.email,
                subject: `Study Storm: "${dataAdmin.goal_name}" resoconto giornaliero del team!`,
                body: "",
                html: html,
            });
        }
    }
    writeTerminal({
        error: false,
        id: 6,
        name: "expired-goals"
    });
});

module.exports = { expiredGoals, teamComponentsAgenda };