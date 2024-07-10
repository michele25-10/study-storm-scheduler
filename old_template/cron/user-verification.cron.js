import { UserVerification } from ('../models/user-verification.model');
import { writeTerminal } from ('../middleware/writeTerminal');
import cron from ('node-cron');

// Schedule tasks to be run on the server.
const clearTableUserVerification = () =>
    cron.schedule('* * * * *', async function () {
        const result = await UserVerification.deleteExpiredAndConfirmUserVerification();
        writeTerminal({ message: "Pulizia tabella user_verification", affectedRows: result.affectedRows, nameFunction: "clearTableUserVerification" });
    });

module.exports = { clearTableUserVerification };