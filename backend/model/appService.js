const AppDAO = require("../integration/appDAO");

/* AppService class for getting comptences from database
*/
class AppService {

    /**
     * It will feches competencies based on the specified language.
     * @param {string} lan - The language code English and Swedish
     * @returns 
     * Returns an array of competencies or a message if no competencies are found.
     * @throws {Error} If an error occurs while fetching competencies.
     **/
    static  async getCompetences(lan) {
        try {
            let competences = await AppDAO.fetchCompetences(lan);
            
           
            competences = competences.length > 0 ? competences : { message: "No competences found." };

            return competences;
        } catch (error) {
            console.error("App error:", error.message);
            throw new Error("Error retrieving competences.");
        }
    }

    /**
     * Fetches all job applications.
     * @returns Will returns an array of data.
     * @throws {Error} handle error  while retrieving data.
     */
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