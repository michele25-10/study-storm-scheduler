# Study-Storm-Scheduler

Scheduler che esegue funzioni asincrone come invio di mail quando si verificano determinate situazioni, backup dei dati, pooling e triggering per determinate tabelle del database.

## API di controllo scheduler

- **POST /api/auth/login** --> login per ragioni di sicurezza.
- **GET /api/health/** --> Fornisce in output le informazioni hardware del server, in maniera tale un domani da poter prendere anche delle decisioni
- **GET /api/scheduler/** --> Fornisce in output la lista dei processi attivi sul server.
- **POST /api/scheduler/start/** --> Avvia i processi
  - all: true --> avvia tutti i processi
  - only: [1, 2, 3] || ["name1", "name2"] --> avvia solo i processi interni all'array in base ad id o nome
  - not: [1, 2, 3] || ["name1", "name2"] --> avvia tutti i processi eccetto quelli interni all'array in base ad id o nome
- **POST /api/scheduler/stop/** --> Stoppa i processi
  - all: true --> stoppa tutti i processi
  - only: [1, 2, 3] || ["name1", "name2"] --> stoppa solo i processi interni all'array in base ad id o nome
  - not: [1, 2, 3] || ["name1", "name2"] --> stoppa tutti i processi eccetto quelli interni all'array in base ad id o nome

## Aggiornamenti scheduler

> **N.B** : prima di lanciare aggiornamenti con pm2 reload study-storm-scheduler ricordati di fermare tutti i processi in esecuzione per ragioni di sicurezza, e ovviamente dopo di lanciare l'api per abilitarli tutti.

# Come aggiungere un nuovo processo?

Inserisci all'interno della cartella cron e dell'array di oggetti Cron il nuovo processo con i seguenti campi:

```js
    {
        schedule:
            cron.schedule('*/5 * * * * *',  //leggi guida cron, definisce ogni quanto si ripete
            disclaimarObsessionatedStudent, //funzione all'interno di cron-function
            {
                scheduled: false,
                timezone: 'Europe/Rome',
                name: "obsessionated-student",
                recoverMissedExecutions: false,
            }),
        name: "obsessionated-student",  //nome del processo
        active: false,                  //stato del processo
        id: 3,                          //id sequenziale del processo
    },
```

La logica che viene eseguita dal processo viene inserita all'interno di cron-function come se fosse un controller di una api.
Una volta scritta la procedura per avviare la task basterà avviare il progetto e chiamare l'API start con nel body {only: [id_processo]}
