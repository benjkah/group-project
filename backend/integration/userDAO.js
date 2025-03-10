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
    //insert person_id och handled_id  as defulat value = 1
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
          WHERE p.person_id = @person_id;`;
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
              AND c.language_id = 1 -- fetches only english translation as it for this assignment is enough
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
 * Retrieves user details from the database according to application id.
 *
 * @param app_id The application ID to search for.
 * @return The user details if found, otherwise null.
 */

static async findUserByAppId(app_id) {
  const query = `
      SELECT p.person_id, p.name, p.surname, p.email, a.application_id, a.handled_id
      FROM [dbo].[person] p
      JOIN [dbo].[application] a ON p.person_id = a.person_id
      WHERE a.application_id = @app_id;
  `;
  const values = [app_id];
  const paramNames = ["app_id"];
  const isStoredProcedure = false;

  const result = await executeQuery(query, values, paramNames, isStoredProcedure);
  return result.recordset.length > 0 ? result.recordset[0] : null;
}

/**
 * Retrieves the user's competencies from the database according  to application_id.
 *
 * This method gets  competency details such as Id, name, and years of experience
 *
 *
 * @param {number} app_id - The application_id to search for competencies.
 * @returns A promise that return to an array of competency records.
 */
static async findCompetenciesByAppId(app_id) {
  const competenceQuery = `
      SELECT 
          cp.competence_profile_id, 
          cp.competence_id, 
          c.name AS competence_name, 
          cp.years_of_experience
      FROM [dbo].[competence_profile] cp
      INNER JOIN [dbo].[competence_translation] c 
          ON cp.competence_id = c.competence_id
          AND c.language_id = 1 -- Fetches only English translation
      INNER JOIN [dbo].[application] app 
          ON cp.application_id = app.application_id
      WHERE cp.application_id = @app_id;
  `;
  const values = [app_id];
  const paramNames = ["app_id"];
  const isStoredProcedure = false;

  const result = await executeQuery(competenceQuery, values, paramNames, isStoredProcedure);
  return result.recordset;
}

/**
 * Retrieves the user's availability  from the database according to application_id.
 *
 * This method gets availability details and  its start and end dates. 
 *
 *
 * @param {number} app_id -  search for availability records.
 * @returns return to an array of availability records.
 */
static async findAvailabilityByAppId(app_id) {
  const availabilityQuery = `
      SELECT a.availability_id, a.from_date, a.to_date  
      FROM [dbo].[availability] a
      WHERE a.application_id = @app_id;
  `;
  const values = [app_id];
  const paramNames = ["app_id"];
  const isStoredProcedure = false;

  const result = await executeQuery(availabilityQuery, values, paramNames, isStoredProcedure);
  return result.recordset;
}

/**
 * Updates the application status by changing the handled ID in the database.
 *
 *
 * @param {number} app_id - The ID of the application to update.
 * @param {number} handle_id - The new handled ID to assign to the application.
 * @returns  return a   promise that with success message if the update is successful.
 *
 */

static async changeApplicationStatus(app_id, handle_id) {

  const statusChangeQuery = `
      UPDATE [dbo].[application]
      SET handled_id = @handle_id
      WHERE application_id = @app_id;
  `;
  
  const values = [app_id, handle_id];
  const paramNames = ["app_id", "handle_id"];
  const isStoredProcedure = false;

  try {
      const result = await executeQuery(statusChangeQuery, values, paramNames, isStoredProcedure);
      if (result.rowsAffected[0] === 0) {
          console.error("No application found with the given ID.");
          throw new Error("No application found with the given ID.");
      }

      return { message: "Status changed successfully." };
  } catch (error) {
      console.error("Error in changeApplicationStatus:", error);
      throw new Error("Error handling application: " + error.message);
  }
}




    /**
      * Deletes a competence from an application.
      * @param {number} id - The ID of the competence profile.
      * @returns The result of the deletion return by new value
      */
    static async removeCompetence(id){
        const competencesQuery = `
        DELETE FROM [dbo].[competence_profile]
        WHERE competence_profile_id = @id;
    `;
    const values = [id];
    const paramNames = ["id"];
    const isStoredProcedure = false;

    const result = await executeQuery(competencesQuery, values, paramNames, isStoredProcedure);

    return result;
    }

     /**
      * Deletes an availability record by its ID.
      * @param {number} id - The ID of the availability entry.
      * @returns return a promis with success message.
      * @throws {Error} If the ID is invalid or the availability is not found.
      */
    static async removeAvailability(id){
      const availabilityQuery = `
      DELETE FROM [dbo].[availability]
      WHERE availability_id = @id;
  `;
  const values = [id];
  const paramNames = ["id"];
  const isStoredProcedure = false;

  const result = await executeQuery(availabilityQuery, values, paramNames, isStoredProcedure);

  return result;
  }

   /**
      * Adds a new competence to an application.
      * @param {number} id - The application ID.
      * @param {number} comp_id - The competence ID.
      * @param {number} yearsOfExperience - The user years of experience.
      * @returns The result of the insertion operation.
      */

  static async addCompetence(id, comp_id, yearsOfExperience){
    const competenceQuery = `
        INSERT INTO [dbo].[competence_profile] (application_id, competence_id, years_of_experience)
        VALUES (@id, @comp_id, @yearsOfExperience);
    `;
    
    const values = [id, comp_id, yearsOfExperience];
    const paramNames = ["id", "comp_id", "yearsOfExperience"];
    const isStoredProcedure = false;

    const result = await executeQuery(competenceQuery, values, paramNames, isStoredProcedure);

    return result;
  }

   /**
      * Adds new availability to an application.
      * @param {number} id - The application ID.
      * @param {string} fromDate - The start date 
      * @param {string} toDate - The end date 
      * @returns The result of the insertion operation and it return new value.
      */

  static async addAvailability(id, fromDate, toDate){
      const availabilityQuery = `
          INSERT INTO [dbo].[availability] (application_id, from_date, to_date)
          VALUES (@id, @fromDate, @toDate);
      `;
      
      const values = [id, fromDate, toDate];
      const paramNames = ["id", "fromDate", "toDate"];
      const isStoredProcedure = false;
  
      const result = await executeQuery(availabilityQuery, values, paramNames, isStoredProcedure);
  
      return result;
  }

    /**
     * Check if user (by username/email/pnr) already exists
     * @param {string} username 
     * @param {string} email 
     * @param {string} pnr
     * @returns true or false
     */
  static async findByUsernameOrEmailOrPnr(username, email, pnr) {
    const query = `
      SELECT person_id, username, email, pnr
      FROM [dbo].[person]
      WHERE username = @username
         OR email = @email
         OR pnr = @pnr
    `;
    const values = [username, email, pnr];
    const paramNames = ["username", "email", "pnr"];
    const isStoredProcedure = false;

    const result = await executeQuery(query, values, paramNames, isStoredProcedure);
    return result.recordset.length > 0 ? result.recordset[0] : null;
  }

  
  /**
   * Insert a new user
   * @param {} param {name, surname, pnr, email, username, password, role_id}
   * @returns true or false
   */
  static async createUser({ name, surname, pnr, email, username, password, role_id }) {
    const query = `
      INSERT INTO [dbo].[person] (
        name, surname, pnr, email, username, password, role_id
      )
      OUTPUT 
        inserted.person_id,
        inserted.name,
        inserted.surname,
        inserted.pnr,
        inserted.email,
        inserted.username,
        inserted.role_id
      VALUES (
        @name,
        @surname,
        @pnr,
        @email,
        @username,
        @password,
        @role_id
      )
    `;

    const values = [name, surname, pnr, email, username, password, role_id];
    const paramNames = ["name", "surname", "pnr", "email", "username", "password", "role_id"];
    const isStoredProcedure = false;

    const result = await executeQuery(query, values, paramNames, isStoredProcedure);

    return result.recordset.length > 0 ? result.recordset[0] : null;
  }
    
}

module.exports = UserDAO;