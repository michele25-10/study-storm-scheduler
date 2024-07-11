const UserVerification = require('../models/user-verification.model');
const { writeTerminal } = require('../middleware/writeTerminal');
const moment = require('moment');
const fs = require('fs');

// Schedule tasks to be run on the server.
const clearTableUserVerification = () => {
    const data = `${moment().format("dd/MM/YYYY HH:mm:ss")} bla bla bla`;
    fs.writeFile('./log.txt', data, (err) => {
        if (err) {
            console.error('Si è verificato un errore durante la scrittura del file:', err);
            return;
        }
        console.log('File scritto correttamente!');
    });
};
/*cron.schedule('* * * * *', async function () {
    const result = await UserVerification.deleteExpiredAndConfirmUserVerification();
    writeTerminal({ message: "Pulizia tabella user_verification", affectedRows: result.affectedRows, nameFunction: "clearTableUserVerification" });
});*/

module.exports = { clearTableUserVerification };