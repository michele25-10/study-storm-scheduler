const connFunction = require('../utils/executeMySql');

const TABLE = "goal";

const Goal = {
    expiredGoals: async () => {
        const mysql = `
        SELECT 
            g.name AS "goal_name", 
            u.email, 
            u.name, 
            u.surname, 
            g.expiry_date,
            DATEDIFF(g.expiry_date, CURDATE()) AS "days_to_expiry"
        FROM ${TABLE} g 
        INNER JOIN 
            user_goal ug ON ug.id_goal = g.id 
        INNER JOIN 
            \`user\` u ON u.id = ug.id_user 
        WHERE g.finished = 0 
            AND CURDATE() IN (
                DATE_SUB(g.expiry_date, INTERVAL 1 DAY),
                DATE_SUB(g.expiry_date, INTERVAL 7 DAY),
                DATE_SUB(g.expiry_date, INTERVAL 14 DAY)
        );`;
        const result = await connFunction.query(mysql,
            {}
        );
        return result;
    },
}

module.exports = Goal;