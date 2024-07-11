const asyncHandler = require('express-async-handler');
const Cron = require('../../cron/cron');
//@desc avvia processi
//@route POST /api/scheduler/start
//@access public
const start = asyncHandler(async (req, res) => {
    if (req.body.all || (!req.body.all && !req.body.only && !req.body.not)) {
        //Abilito tutte le cron schedule
        for (const row of Cron) {
            //Avvio solamente le task che sono disattivate
            if (!row.active) {
                row.schedule.start();
                row.active = true;
            }
        }
        res.json({ message: "Tutte le task sono state avviate" });
        return;
    } else if (req.body.only) {
        //Attivo solamente le task con id o nome interno alla lista 
        for (const row of only) {
            Cron.forEach(item => {
                //attivo quelle presenti nella lista solo se sono disattivate
                if ((item.id == row || item.name == row) && !item.active) {
                    item.schedule.start();
                    item.active = true;
                }
            });
        }
        res.json({ message: "Sono state avviate solo le task richieste" });
        return;
    } else if (req.body.not) {
        //Attivo tutte le task ad eccezione di quelle presenti nell'array not
        let skip = false;
        for (const row of Cron) {
            //Controllo se la row di cron è presente anche nella lista dei not 
            for (const item of req.body.not) {
                if (item == row.name || item == row.id) {
                    skip = true;
                    return;
                }
            }

            //se non è presente e il processo e disattivato allora avvio il processo
            if (!skip && !row.active) {
                row.schedule.start();
                row.active = true;
            }
            skip = false;
        }
        res.json({ message: "Sono state avviate tutte le task eccetto quelle indicate" });
        return;
    } else {
        res.status(500);
        throw new Error("API interrogata in modo erratto, vedi documentazione");
    }
});

//@desc ferma processi
//@route POST /api/scheduler/start
//@access public
const stop = asyncHandler(async (req, res) => {
    if (req.body.all || (!req.body.all && !req.body.only && !req.body.not)) {
        //Disabilito tutte le cron schedule
        for (const row of Cron) {
            //Disabilito solamente le task che sono attive
            if (row.active) {
                row.schedule.stop();
                row.active = false;
            }
        }
        res.json({ message: "Tutte le task sono state stoppate" });
        return;
    } else if (req.body.only) {
        //disattivo solamente le task con id o nome interno alla lista 
        for (const row of only) {
            Cron.forEach(item => {
                //disattivo quelle presenti nella lista solo se sono attive
                if ((item.id == row || item.name == row) && item.active) {
                    item.schedule.start();
                    item.active = true;
                }
            });
        }
        res.json({ message: "Sono state stoppate solo le task richieste" });
        return;
    } else if (req.body.not) {
        //Disattivo tutte le task ad eccezione di quelle presenti nell'array not
        let skip = false;
        for (const row of Cron) {
            //Controllo se la row di cron è presente anche nella lista dei not 
            for (const item of req.body.not) {
                if (item == row.name || item == row.id) {
                    skip = true;
                    return;
                }
            }

            //se non è presente e il processo e attivo allora disattivo il processo
            if (!skip && row.active) {
                row.schedule.start();
                row.active = true;
            }
            skip = false;
        }
        res.json({ message: "Sono state stoppate tutte le task eccetto quelle indicate" });
        return;
    } else {
        res.status(500);
        throw new Error("API interrogata in modo erratto, vedi documentazione");
    }
});

//@desc lista dei processi
//@route GET /api/scheduler/
//@access public
const list = asyncHandler(async (req, res) => {
    let response = {};
    for (const row of Cron) {
        response[row.name] = row.active;
    }
    res.json(response);
});

module.exports = { start, stop, list }