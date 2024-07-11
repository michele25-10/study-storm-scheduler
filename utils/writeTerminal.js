const moment = require('moment');
const chalk = require('chalk');

const fs = require('fs');
const path = require('path');

const writeTerminal = ({ error, id, name, datetime = moment().format("DD/MM/YYYY HH:mm:ss") }) => {
    const message = `${id} ${name} ${datetime} ${error ? 'ERROR' : 'SUCCESS'}`;
    if (error) {
        console.log(chalk.red(message))
    } else {
        console.log(chalk.green(message))
    }

    const logFilePath = path.join(__dirname, '../log.txt');
    fs.appendFile(logFilePath, message + "\n", (err) => {
        if (err) {
            return console.error(`Errore durante l'aggiunta al file: ${err.message}`);
        }
        //console.log('Aggiunta al file completata');
    });
}

module.exports = { writeTerminal }; 