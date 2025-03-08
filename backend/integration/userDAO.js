const { executeQuery } = require("../database.js");

/**
 * Data Access Object (DAO) for user-related database operations.
 * This class interacts with the database but does not handle errors.
 * Returns `null` for objects that do not exist and an empty array `[]` for empty results.
 */
class UserDAO {

    /**
     * Controll the user login credentials.
     * @param {string} username - The username .
     * @param {string} password - The password .
     * @returns The user's basic details if found, otherwise null.
     */
    static async verifyLogin(username, password) {
        const query = `SELECT person_id, username, role_id FROM [dbo].[person] WHERE username = @username AND password = @password`;
        const values = [username, password];
        const paramNames = ["username", "password"];
        const isStoredProcedure = false;

        const result = await executeQuery(query, values, paramNames, isStoredProcedure);
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }

    /**
     * Finds an application ID by person ID.
     * @param {number} person_id - The ID of the user as person_id.
     * @returns The application ID if found, otherwise null.
     */
    static async findApplication(person_id) {
        const query = `SELECT application_id FROM [dbo].[application] WHERE person_id = @person_id`;
        const values = [person_id];
        const paramNames = ["person_id"];
        const isStoredProcedure = false;

        const result = await executeQuery(query, values, paramNames, isStoredProcedure);
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }

    /**
     * Creates a new application for a user that doesnt have application id.
     * @param {number} person_id - The ID of the user.
     * @returns The created application ID if successful, otherwise will null.
     */
    static async createApplication(person_id) {
        const query = `INSERT INTO [dbo].[application] (person_id, handled_id) OUTPUT INSERTED.application_id VALUES (@person_id, 1)`;
        const values = [person_id];
        const paramNames = ["person_id"];
        const isStoredProcedure = false;

        const result = await executeQuery(query, values, paramNames, isStoredProcedure);
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }

    /**
     * Retrieves user details by  using person ID.
     * @param {number} person_id - The user person_id of the user.
     * @returns The user details if found, otherwise null.
     */
    static async findUserById(person_id) {
        const query = `
            SELECT p.person_id, p.name, p.surname, p.email, a.application_id, a.handled_id
            FROM [dbo].[person] p
            JOIN [dbo].[application] a ON p.person_id = a.person_id
            WHERE p.person_id = @person_id;
        `;
        const values = [person_id];
        const paramNames = ["person_id"];
        const isStoredProcedure = false;

        const result = await executeQuery(query, values, paramNames, isStoredProcedure);
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }

    /**
     * Retrieves a user's competencies by using personid.
     * @param {number} person_id - The person id of the user.
     * @returns An array of competencies will return.
     */
    static async findCompetencies(person_id) {
        const competenceQuery = `
            SELECT 
                cp.competence_profile_id, 
                cp.competence_id, 
                c.name AS competence_name, 
                cp.years_of_experience
            FROM [dbo].[competence_profile] cp
            INNER JOIN [dbo].[competence_translation] c 
                ON cp.competence_id = c.competence_id
                AND c.language_id = 1
            INNER JOIN [dbo].[application] app 
                ON cp.application_id = app.application_id
            WHERE app.person_id = @person_id
        `;
        const values = [person_id];
        const paramNames = ["person_id"];
        const isStoredProcedure = false;

        const result = await executeQuery(competenceQuery, values, paramNames, isStoredProcedure);
        return result.recordset;
    }

    /**
     * Retrieves a user's availability by person ID.
     * @param {number} person_id - The person_id of the user.
     * @returns An array of availability records.
     */
    static async findAvailability(person_id) {
        const availabilityQuery = `
            SELECT a.availability_id, a.from_date, a.to_date  
            FROM [dbo].[availability] a
            INNER JOIN [dbo].[application] app ON a.application_id = app.application_id
            WHERE app.person_id = @person_id
        `;
        const values = [person_id];
        const paramNames = ["person_id"];
        const isStoredProcedure = false;

        const result = await executeQuery(availabilityQuery, values, paramNames, isStoredProcedure);
        return result.recordset;
    }

    /**
     * Deletes a competence from an application.
     * @param {number} id - The ID of the competence profile.
     * @returns The result of the deletion return by new value
     */
    static async removeCompetence(id) {
        const competencesQuery = `
            DELETE FROM [dbo].[competence_profile]
            WHERE competence_profile_id = @id;
        `;
        const values = [id];
        const paramNames = ["id"];
        const isStoredProcedure = false;

        return await executeQuery(competencesQuery, values, paramNames, isStoredProcedure);
    }

    /**
     * Deletes availability from an application.
     * @param {number} id - The ID of the availability .
     * @returns The result of the deletion and resturn new value.
     */
    static async removeAvailability(id) {
        const availabilityQuery = `
            DELETE FROM [dbo].[availability]
            WHERE availability_id = @id;
        `;
        const values = [id];
        const paramNames = ["id"];
        const isStoredProcedure = false;

        return await executeQuery(availabilityQuery, values, paramNames, isStoredProcedure);
    }

    /**
     * Adds a new competence to an application.
     * @param {number} id - The application ID.
     * @param {number} comp_id - The competence ID.
     * @param {number} yearsOfExperience - The user years of experience.
     * @returns The result of the insertion operation.
     */
    static async addCompetence(id, comp_id, yearsOfExperience) {
        const competenceQuery = `
            INSERT INTO [dbo].[competence_profile] (application_id, competence_id, years_of_experience)
            VALUES (@id, @comp_id, @yearsOfExperience);
        `;
        const values = [id, comp_id, yearsOfExperience];
        const paramNames = ["id", "comp_id", "yearsOfExperience"];
        const isStoredProcedure = false;

        return await executeQuery(competenceQuery, values, paramNames, isStoredProcedure);
    }

    /**
     * Adds new availability to an application.
     * @param {number} id - The application ID.
     * @param {string} fromDate - The start date 
     * @param {string} toDate - The end date 
     * @returns The result of the insertion operation and it return new value.
     */
    static async addAvailability(id, fromDate, toDate) {
        const availabilityQuery = `
            INSERT INTO [dbo].[availability] (application_id, from_date, to_date)
            VALUES (@id, @fromDate, @toDate);
        `;
        const values = [id, fromDate, toDate];
        const paramNames = ["id", "fromDate", "toDate"];
        const isStoredProcedure = false;

        return await executeQuery(availabilityQuery, values, paramNames, isStoredProcedure);
    }
}

module.exports = UserDAO;