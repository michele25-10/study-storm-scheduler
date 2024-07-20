#!/bin/bash
#Questo script va inserito in /config/executeBackup.sh

# Parametri del database
DB_NAME=""
DB_USER=""
DB_PASS=""
DB_HOST=""

# Directory di destinazione del backup
BACKUP_DIR="/home/gabrieli/ftp/files/study-storm-scheduler/backup"
TIMESTAMP=$(date +"%F")
BACKUP_PATH="$BACKUP_DIR/$DB_NAME-$TIMESTAMP.sql"

# Crea la directory di backup se non esiste
mkdir -p $BACKUP_DIR

# Eseguire il backup
mysqldump -h $DB_HOST -u $DB_USER -p$DB_PASS $DB_NAME > $BACKUP_PATH

# Verifica se il backup è riuscito
if [ $? -eq 0 ]; then
  echo "Backup del database $DB_NAME eseguito con successo: $BACKUP_PATH"
else
  echo "Errore durante il backup del database $DB_NAME"
fi
