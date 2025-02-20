const { executeQuery } = require("../database.js");


// UserDAO (Data Access Object) class used  for database interactions
//Dont use error handling here in DAO
//  use Null for object that not EXIST
// use empty array [] for object that is empty

class UserDAO {



    //check the user login credentials by checking the database.
    static async verifyLogin(username, password) {
        const query = `SELECT person_id, username FROM [dbo].[person] WHERE username = @username AND password = @password`;
        const values = [username, password];
        const paramNames = ["username", "password"];
        const isStoredProcedure = false;

        const result = await executeQuery(query, values, paramNames, isStoredProcedure);
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }

    //return the user details from the database based on their person_id.

    static async findUserById(person_id) {
        const query = `SELECT person_id, name, surname, email FROM [dbo].[person] WHERE person_id = @person_id`;
        const values = [person_id];
        const paramNames = ["person_id"];
        const isStoredProcedure = false;

        const result = await executeQuery(query, values, paramNames, isStoredProcedure);
        return result.recordset.length > 0 ? result.recordset[0] : null;
    }
   // return  user comenetcies from the database 
    static async findCompetencies(person_id) {
        const competenceQuery = `
            SELECT cp.competence_id, c.name, cp.years_of_experience
            FROM [dbo].[competence_profile] cp
            JOIN [dbo].[competence_translation] c 
            ON cp.competence_id = c.competence_id 
            WHERE cp.application_id = @person_id
        `;
        const values = [person_id];
        const paramNames = ["person_id"];
        const isStoredProcedure = false;
    
        const result = await executeQuery(competenceQuery, values, paramNames, isStoredProcedure);
        return result.recordset;
    }
    
 // return  user availibilties from the database 
    static async findAvailability(person_id) {
        const availabilityQuery = `
            SELECT from_date, to_date  
            FROM [dbo].[availability] 
            WHERE application_id = @person_id
        `;
        const values = [person_id];
        const paramNames = ["person_id"];
        const isStoredProcedure = false;
    
        const result = await executeQuery(availabilityQuery, values, paramNames, isStoredProcedure);
        return result.recordset;
    }

    //remove competence from application
    static async removeCompetence(competence_profile_id){
        const competencesQuery = `
        DELETE FROM [dbo].[competence_profile
        WHERE competence_profile_id = @competence_profile_id;
    `;
    const values = [competence_profile_id];
    const paramNames = ["competence_profile_id"];
    const isStoredProcedure = false;

    const result = await executeQuery(competencesQuery, values, paramNames, isStoredProcedure);

    return result;
    }
    
}

module.exports = UserDAO;
