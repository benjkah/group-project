
const e = require("express");
const UserDAO = require("../integration/userDAO");

/**
 * Service class for managing intracting between backend and database.
 */
class UserService {

    /**
     * Retrieves a user's profile by their person ID.
     * @param {number} person_id - The ID of the user.
     * @returns {Promise<Object>} The user profile containing name, lastname, email, competencies, and availability.
     * @throws {Error} If the profile is not found or an error occurs.
     */
    static async getUserProfile(person_id) {
        try {
            const userProfile = await UserDAO.findUserById(person_id);
            if (!userProfile) {
                throw new Error("Profile not found.");
            }

            const competencies = await UserDAO.findCompetencies(person_id);
           
            userProfile.competencies = competencies.length > 0 ? competencies : { message: "No competencies found." };

            const availability = await UserDAO.findAvailability(person_id);
            userProfile.availability = availability.length > 0 ? availability : { message: "No availability found." };

            return userProfile;
        } catch (error) {
            console.error("Profile error:", error.message);
            throw new Error("Error retrieving user profile.");
        }
    }

    /**
     * Retrieves a user's profile based on an application ID.
     * @param {number} app_id - The ID of the application.
     * @returns {Promise<Object>} The user profile including competencies and availability.
     * @throws {Error} If the profile is not found or an error occurs.
     */
    static async getApplication(app_id) {
        try {
            const userProfile = await UserDAO.findUserByAppId(app_id);
            if (!userProfile) {
                throw new Error("Profile not found.");
            }

            const competencies = await UserDAO.findCompetenciesByAppId(app_id);
            userProfile.competencies = competencies.length > 0 ? competencies : { message: "No competencies found." };

            const availability = await UserDAO.findAvailabilityByAppId(app_id);
            userProfile.availability = availability.length > 0 ? availability : { message: "No availability found." };

            return userProfile;
        } catch (error) {
            console.error("Profile error:", error.message);
            throw new Error("Error retrieving user profile.");
        }
    }

    /**
     * Changes the status of an application.
     * @param {number} appId - The ID of the application.
     * @param {number} handleId - The new status identifier.
     * @returns {Promise<Object>} A success message.
     * @throws {Error} If IDs are invalid or the application is not found.
     */
    static async changeApplicationStatus(appId, handleId) {
        try {
            if (!appId || !handleId) {
                throw new Error("Invalid ID provided.");
            }

            const result = await UserDAO.changeApplicationStatus(appId, handleId);
            if (!result || result.affectedRows === 0) {
                throw new Error("No application found with the given ID.");
            }

            return { message: "Application successfully handled." };
        } catch (error) {
            console.error("Error in changeApplicationStatus:", error.stack);
            throw new Error("Error handling application: " + error.message);
        }
    }

    /**
     * Deletes an availability record by its ID.
     * @param {number} id - The ID of the availability entry.
     * @returns {Promise<Object>} A success message.
     * @throws {Error} If the ID is invalid or the availability is not found.
     */
    static async deleteAvailability(id) {
        try {
            if (!id) {
                throw new Error("Invalid ID provided for deletion.");
            }

            const result = await UserDAO.removeAvailability(id);
            if (!result || result.affectedRows === 0) {
                throw new Error("No availability found with the given ID.");
            }

            return { message: "Availability successfully removed." };
        } catch (error) {
            console.error("Error in deleteAvailability:", error.stack);
            throw new Error("Error removing availability: " + error.message);
        }
    }

    /**
     * Deletes a competence record by its ID.
     * @param {number} id - The ID of the competence entry.
     * @returns {Promise<Object>} A success message.
     * @throws {Error} If the ID is invalid or the competence is not found.
     */
    static async deleteCompetence(id) {
        try {
            if (!id) {
                throw new Error("Invalid ID provided for deletion.");
            }

            const result = await UserDAO.removeCompetence(id);
            if (!result || result.affectedRows === 0) {
                throw new Error("No competence found with the given ID.");
            }

            return { message: "Competence successfully removed." };
        } catch (error) {
            console.error("Error in deleteCompetence:", error.stack);
            throw new Error("Error removing competence: " + error.message);
        }
    }

    /**
     * Adds a new competence to a user's profile.
     * @param {number} id - The Id for  userID.
     * @param {number} comp_id - The ID for  competence like comptence id.
     * @param {number} yearsOfExperience - The number of years of experience.
     * @returns  A success message.
     * @throws {Error} Shows error i the competence cannot be added.
     */
    static async addCompetence(id, comp_id, yearsOfExperience) {
        try {
            const result = await UserDAO.addCompetence(id, comp_id, yearsOfExperience);
            if (!result || result.affectedRows === 0) {
                throw new Error("Competence could not be added.");
            }

            return { message: "Competence successfully added." };
        } catch (error) {
            console.error("Error in addCompetence:", error.stack);
            throw new Error("Error adding competence: " + error.message);
        }
    }

    /**
     * Adds a new availability period for a user.
     * @param {number} id - The id for userID.
     * @param {string} fromDate - The start date of availability .
     * @param {string} toDate - The end date of availability (.
     * @returns  A success message.
     * @throws {Error}  shows if the availability cannot be added.
     */
    static async addAvailability(id, fromDate, toDate) {
        try {
            if (!id) {
                throw new Error("Invalid profile ID provided.");
            }

            const result = await UserDAO.addAvailability(id, fromDate, toDate);
            if (!result || result.affectedRows === 0) {
                throw new Error("Availability could not be added.");
            }

            return { message: "Availability successfully added." };
        } catch (error) {
            console.error("Error in addAvailability:", error.stack);
            throw new Error("Error adding availability: " + error.message);
        }
    }
}

module.exports = UserService;