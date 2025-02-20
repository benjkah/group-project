const AppDAO = require("../integration/appDAO");

class AppService {
    static async getCompetences(lan) {
        try {
            const competences = await AppDAO.fetchCompetences(lan);
            //if the value is emty array []  so return a (optional)message "No competencies found."
            competences = competences.length > 0 ? competences : { message: "No competences found." };

        
            return competences;
        } catch (error) {
            console.error("App error:", error.message);
            throw new Error("Error retrieving competences.");
        }
    }
}

module.exports = AppService;