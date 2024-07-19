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
    selectIdGoalOfTeam: async () => {
        const mysql = `SELECT ug.id_goal FROM user_goal ug GROUP BY ug.id_goal HAVING COUNT(ug.id_goal) > 1;`;
        const result = await connFunction.query(mysql, {});
        return result;
    },
    selectAdminTeam: async ({ id_goal }) => {
        const mysql = `
            SELECT u.email, u.name, u.surname, g.name as goal_name
            FROM user_goal ug 
            inner join user u on ug.id_user like u.id 
            inner join goal g on g.id = ug.id_goal 
            where ug.admin = 1 AND ug.id_goal = 1;`;
        const result = await connFunction.query(mysql, { id_goal });
        return result[0];
    }
}

module.exports = Goal;