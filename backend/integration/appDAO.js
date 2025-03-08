const { executeQuery } = require("../database.js");

/**
 
 * This class interacts with the database to fetch competences.
 */
class AppDAO {

    /**
     * Fetches competences available in a according the language.
     * 
     * @param  lan - The language code swedish or english.
     * @returns  - A list of competences according language.
     * 
     * 
     */
    static async fetchCompetences(lan) {
        const competencesQuery = `
            SELECT competence_id, name
            FROM [dbo].[competence_translation]
            WHERE language_id = (
                SELECT language_id
                FROM [dbo].[language]
                WHERE language_code = @lan
            )
        `;
        const values = [lan];
        const paramNames = ["lan"];
        const isStoredProcedure = false;

        const result = await executeQuery(competencesQuery, values, paramNames, isStoredProcedure);
        return result.recordset;
    }

    /**
     * Retrieves all job applications according to applicant's name, surname, and status.
     * 
     * @returns  - A list of all applications with applicant details.
     * 
    
     */
    static async getAllApplications() {
        const query = `
            SELECT
                a.application_id,
                a.person_id,
                p.name,
                p.surname,
                a.handled_id,
                CASE
                    WHEN a.handled_id = 1 THEN 'unhandled'
                    WHEN a.handled_id = 2 THEN 'accepted'
                    WHEN a.handled_id = 3 THEN 'denied'
                END AS status
            FROM [dbo].[application] a
            JOIN [dbo].[person] p 
                ON a.person_id = p.person_id
        `;
        const values = [];
        const paramNames = [];
        const isStoredProcedure = false;

        const result = await executeQuery(query, values, paramNames, isStoredProcedure);
        return result.recordset || [];
    }
}

module.exports = AppDAO;
