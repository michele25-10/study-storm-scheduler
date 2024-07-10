const moment = require('moment');

const writeTerminal = ({ error, warn, message, affectedRows, nameFunction }) => {
    const string = { datetime: moment().format("DD/MM/YYYY HH:mm:ss"), function: nameFunction, message, affectedRows };
    if (error) {
        console.error(string);
    } else if (warn) {
        console.warn(string);
    } else {
        console.info(string);
    }
}

module.exports = writeTerminal;