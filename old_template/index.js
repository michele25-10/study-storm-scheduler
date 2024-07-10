//const schedule = require('node-schedule');
//require('dotenv').config();

/*const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            name: 'list',
            //message: 'What is your favorite reptile?'
        },
    ])
    .then(answers => {
        try {
            const data = fs.readFileSync('./file.json', 'utf8');
            const jsonData = JSON.parse(data);
            console.log(jsonData);
        } catch (err) {
            console.error('Error reading file:', err);
        }
    });*/

// import function
//const UserVerification = require('./function/user-verification.function');
//const ResetPassword = require('./function/reset-password.function');

//task scheduler
//schedule.scheduleJob('0 */6 * * *', () => UserVerification.clearTableUserVerification()); //ogni 6 ore

//schedule.scheduleJob('*/15 * * * *', () => ResetPassword.clearTableResetPassword()); //ogni 30 minuti

//#!/usr/bin / env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import schedule from "node-schedule";

program.version("1.0.0").description("My Node CLI");

program.action(() => {
    inquirer
        .prompt([
            {
                type: "input",
                name: "name",
                message: "What's your name?",
            },
        ])
        .then((answers) => {
            console.log(chalk.green(`Hey there, ${answers.name}!`));

            // Definisci il job che verrà eseguito ogni 30 secondi
            const job = schedule.scheduleJob('*/30 * * * * *', () => {
                console.log(chalk.blue(`Task executed at ${new Date().toLocaleTimeString()}`));
                // Qui puoi aggiungere il codice della task che vuoi eseguire ogni 30 secondi
            });

            console.log(chalk.yellow('The task will run every 30 seconds.'));
        });
});

program.parse(process.argv);