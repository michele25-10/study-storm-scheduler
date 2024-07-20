const { exec } = require('child_process');

const path = require('path');
const moment = require('moment');

const { writeTerminal } = require('../utils/writeTerminal');
const sendMailToDeveloper = require('../utils/sendMailToDeveloper');


// Funzione per eseguire il backup del database
const backupDatabase = () => {
    //percorso per raggiungere lo script
    const pathScript = path.resolve(__dirname, '../config/executeBackup.sh');

    //esecuzione dello script
    exec(`sh ${pathScript}`, (error, stdout, stderr) => {
        if (error) {
            writeTerminal({ error: true, id: 7, name: "backup-database" });
            console.log(error);
            sendMailToDeveloper({
                object: "Study Storm: Backup Database Error",
                body: `Gentile sviluppatore, <br>
                Ci teniamo ad informarti che il backup del database di Study Storm NON è avvenuto con successo alle ore: ${moment().format("DD/MM/YYYY HH:mm:ss")}.<br>
                Ti suggeriamo di controllare i log per capire l'entità dell'errore.<br>
                Buon proseguimento di giornata.`,
                html: null,
            });
            return;
        }

        writeTerminal({ error: false, id: 7, name: "backup-database" });
        console.log(`Output: ${stdout}`);
        sendMailToDeveloper({
            object: "Study Storm: Backup Database success",
            body: `Gentile sviluppatore, <br>
            Ci teniamo ad informarti che il backup del database di Study Storm è avvenuto con successo alle ore: ${moment().format("DD/MM/YYYY HH:mm:ss")},<br>
            Buon proseguimento di giornata.`,
            html: null,
        });
    });
};

module.exports = { backupDatabase }; 