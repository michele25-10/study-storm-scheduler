const connFunction = require('../utils/executeMySql');

const TABLE = "agenda";

const Agenda = {
    teamComponentsAgenda: async ({ id_goal }) => {
        const mysql = `
        select u.name, u.surname, a.id, a.note, a.minutes, ug.id_goal 
        from user u
        inner join user_goal ug on u.id LIKE ug.id_user 
        inner join user_task_agenda uta on uta.id_user like u.id
        inner join agenda a on a.id = uta.id_agenda 
        where ug.admin = 0 AND ug.active = 1 AND ug.id_goal=@id_goal AND a.\`date\`=CURDATE(); `;
        const result = await connFunction.query(mysql,
            { id_goal }
        );
        return result;
    },
}

module.exports = Agenda;