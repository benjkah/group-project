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
    
            return { message: "Availability successfully removed." };
        } catch (error) {
            console.error("Error in deleteCompetence:", error.stack);
            throw new Error("Error removing competence: " + error.message);
        }
    }
    

}

module.exports = UserService;
