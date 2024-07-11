const connFunction = require('../utils/executeMySql');

const TABLE = "user";

const User = {
    obsessionatedStudent: async () => {
        const mysql = `
        SELECT u.id, u.email, u.name, u.surname, sum(a.minutes) as value
        FROM \`user\` u
        INNER JOIN user_task_agenda uta ON uta.id_user = u.id
        INNER JOIN agenda a ON a.id = uta.id_agenda
        WHERE a.\`date\` BETWEEN DATE_SUB(NOW(), INTERVAL 7 DAY) AND NOW()
        GROUP BY u.id, u.email 
        HAVING SUM(a.minutes) > (25 * 60);`
        const result = await connFunction.query(mysql, {});
        return result;
    },
}

module.exports = User;