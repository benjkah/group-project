const e = require("express");
const UserDAO = require("../integration/userDAO");

class UserService {
    static async getUserProfile(person_id) {
        try {
            const userProfile = await UserDAO.findUserById(person_id);
            if (!userProfile) {
                throw new Error("Profile not found.");
            }

            const competencies = await UserDAO.findCompetencies(person_id);
            //if the value is emty array []  so return a (optional)message "No competencies found."
            userProfile.competencies = competencies.length > 0 ? competencies : { message: "No competencies found." };

            const availability = await UserDAO.findAvailability(person_id);
            userProfile.availability = availability.length > 0 ? availability : { message: "No availability found." };
            // return the userProfile in json format that contain {name , lastname , email .. competenncies , avlivilies}
            return userProfile;
        } catch (error) {
            console.error("Profile error:", error.message);
            throw new Error("Error retrieving user profile.");
        }
    }

    static async getApplication(app_id) {
        try {
            const userProfile = await UserDAO.findUserByAppId(app_id);
            if (!userProfile) {
                throw new Error("Profile not found.");
            }

            const competencies = await UserDAO.findCompetenciesByAppId(app_id);
            //if the value is emty array []  so return a (optional)message "No competencies found."
            userProfile.competencies = competencies.length > 0 ? competencies : { message: "No competencies found." };

            const availability = await UserDAO.findAvailabilityByAppId(app_id);
            userProfile.availability = availability.length > 0 ? availability : { message: "No availability found." };
            // return the userProfile in json format that contain {name , lastname , email .. competenncies , avlivilies}
            return userProfile;
        } catch (error) {
            console.error("Profile error:", error.message);
            throw new Error("Error retrieving user profile.");
        }
    }

    static async changeApplicationStatus(appId, handleId){
        try {
            if (!appId || !handleId) {
                throw new Error("Invalid ID provided.");
            }
    
            const result = await UserDAO.changeApplicationStatus(appId, handleId);
            if (!result || result.affectedRows === 0) { // Ensure database operation was successful
                throw new Error("No application found with the given ID.");
            }
    
            return { message: "Application successfully handled." };
        } catch (error) {
            console.error("Error in changeApplicationStatus:", error.stack);
            throw new Error("Error handling application: " + error.message);
        }
    }

    static async deleteAvailability(id) {
        try {
            if (!id) {
                throw new Error("Invalid ID provided for deletion.");
            }
    
            const result = await UserDAO.removeAvailability(id);
            
            if (!result || result.affectedRows === 0) { // Ensure database operation was successful
                throw new Error("No availability found with the given ID.");
            }
    
            return { message: "Availability successfully removed." };
        } catch (error) {
            console.error("Error in deleteAvailability:", error.stack);
            throw new Error("Error removing availability: " + error.message);
        }
    }
    
    
    static async deleteCompetence(id) {
        try {
            if (!id) {
                throw new Error("Invalid ID provided for deletion.");
            }
    
            const result = await UserDAO.removeCompetence(id);
            
            if (!result || result.affectedRows === 0) { // Ensure database operation was successful
                throw new Error("No competence found with the given ID.");
            }
    
            return { message: "Competence successfully removed." };
        } catch (error) {
            console.error("Error in deleteCompetence:", error.stack);
            throw new Error("Error removing competence: " + error.message);
        }
    }

    static async addCompetence(id, comp_id, yearsOfExperience){
        try {
    
            const result = await UserDAO.addCompetence(id, comp_id, yearsOfExperience);
            
            if (!result || result.affectedRows === 0) { // Ensure database operation was successful
                throw new Error("Competence could not be added.");
            }
    
            return { message: "Competence successfully added." };
        } catch (error) {
            console.error("Error in addCompetence:", error.stack);
            throw new Error("Error adding competence: " + error.message);
        }
    }

    static async addAvailability(id, fromDate, toDate){
        try {
            if (!id) {
                throw new Error("Invalid profile ID provided.");
            }
    
            const result = await UserDAO.addAvailability(id, fromDate, toDate);
            
            if (!result || result.affectedRows === 0) { // Ensure database operation was successful
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
