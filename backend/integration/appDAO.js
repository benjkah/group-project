const { executeQuery } = require("../database.js");

class AppDAO{

    //Fetch competences in current language
    static async fetchCompetences(lan){
        const competencesQuery = `
        SELECT competence_id, name
        FROM [dbo].[competence_translation]
        WHERE language_id = (
        SELECT language_id
        FROM [dbo].[language]
        WHERE language_code = @lan)
    `;
    const values = [lan];
    const paramNames = ["lan"];
    const isStoredProcedure = false;

    const result = await executeQuery(competencesQuery, values, paramNames, isStoredProcedure);
    console.log("compret:"+ result);
    return result.recordset;
    }
}
module.exports = AppDAO;