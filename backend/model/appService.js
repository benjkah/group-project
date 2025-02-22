const AppDAO = require("../integration/appDAO");

class AppService {

    static async getCompetences(lan) {
        try {
            let competences = await AppDAO.fetchCompetences(lan);
            //if the value is emty array []  so return a (optional)message "No competencies found."
            competences = competences.length > 0 ? competences : { message: "No competences found." };

        
            return competences;
        } catch (error) {
            console.error("App error:", error.message);
            throw new Error("Error retrieving competences.");
        }
    }

    static async fetchAllApplications() {
        try {
          // Get all applications from the DAO
          const applications = await AppDAO.getAllApplications();
          return applications;
        } catch (error) {
          throw new Error("Failed to fetch applications.");
        }
    }
}

module.exports = AppService;