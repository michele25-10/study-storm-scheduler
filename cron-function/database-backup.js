/*const cron = require('node-cron');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configurazione del database
const DB_HOST = 'localhost';
const DB_USER = 'tuo_utente';
const DB_PASSWORD = 'tua_password';
const DB_NAME = 'tuo_database';

// Cartella di destinazione per i backup
const BACKUP_DIR = path.join(__dirname, 'backup');

// Funzione per eseguire il backup del database
const backupDatabase = () => {
    // Creazione di un timestamp per il nome del file di backup
    const timestamp = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').replace(/\..+/, '');
    const backupFile = path.join(BACKUP_DIR, `${DB_NAME}_${timestamp}.sql`);
    
    // Comando per eseguire il backup del database
    const dumpCommand = `mysqldump -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWORD} ${DB_NAME} > ${backupFile}`;

    // Esecuzione del comando
    exec(dumpCommand, (error, stdout, stderr) => {
        if (error) {
            console.error(`Errore durante il backup: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`Errore durante il backup: ${stderr}`);
            return;
        }
        console.log(`Backup completato: ${backupFile}`);
    });
};

// Crea la cartella di backup se non esiste
if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR);
}

// Pianifica il job di backup usando node-cron
cron.schedule('0 2 * * *', () => {
    console.log('Eseguendo il backup del database...');
    backupDatabase();
});*/