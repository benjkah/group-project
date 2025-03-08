const AccessService = require("../model/accessService");
const UserService = require("../model/userService");
const AppService = require("../model/appService");

class Controller {
    /**
     * Login the user recvest,
     * cerat a recvest to sett a cooki.
     * @param {req.body} req {req.body.username, req.body.password}
     * @param {*} res status
     */
    static async login(req, res) {
        try {
            const username = req.body.username;
            const password = req.body.password;
            const user = await AccessService.loginUser(username, password, res);
            res.json({ message: "Login successful", user });  
        } catch (error) {
            res.status(401).json({ message: error.message });
        }
    }

    /**
     * Logout, 
     * the signal to clear the cooki
     * @param {*} req null 
     * @param {*} res Status
     */
    static async logout(req, res) {
        try {
            const result = await AccessService.logoutUser(res);
            res.status(200).json(result);  
        } catch (error) {
            res.status(500).json({ message: error.message || "Error logging out." });
        }
    }
    


    /**
     * Get the user data of person_id
     * @param {*} req {req.person_id} 
     * @param {*} res 
     */
    static async getProfile(req, res) {
        try {
            const person_id = req.person_id; 
            const userProfile = await UserService.getUserProfile(person_id);
            res.status(200).json(userProfile);
        } catch (error) {
            console.error("Error fetching profile:", error);
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * get the application fpr the users in req.params id
     * @param {*} req {req.params}
     * @param {*} res 
     */
    static async getApplication(req, res) {
        try {
            const { id } = req.params; 
            const userProfile = await UserService.getApplication(id);
            res.status(200).json(userProfile);
        } catch (error) {
            console.error("Error fetching profile:", error);
            res.status(500).json({ message: error.message });
        }
    }

    /**
     * change Application Status
     * @param {*} req {req.params.id, req.body}
     * @param {*} res 
     * @returns 
     */
    static async changeApplicationStatus(req,res){
        try {
            const appId = req.params.id;
            const { handleId } = req.body;
            if (!appId) {
                return res.status(400).json({ message: "Application ID is required" });
            }
    
            const result = await UserService.changeApplicationStatus(appId, handleId);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Application not found" });
            }
    
            res.status(200).json({ message: "Status changed successfully" });
        } catch (error) {
            console.error("Error changing status:", error);
            res.status(500).json({ message: "Failed to change status" });
        }
    }

    /**
     * get Competences
     * @param {*} req {req.params} is the ID
     * @param {*} res 
     */
    static async getCompetences(req, res) {
        const { lan } = req.params;
        try {
            const competences = await AppService.getCompetences(lan);
            res.status(200).json(competences);
        } catch (error) {
            console.error("Error fetching competences:", error);
            res.status(500).json({ message: error.message });
        }
    }
    
    /**
     * register new user
     * On success, you can respond with the created user
     * 
     * Typically we'd check for 4xx vs 5xx,
     * but for simplicity, let's just return 400 with the error message
     * @param {*} req name, surname, pnr, email, username, password, role_id - optional.
     * @param {*} res save return data
     * @returns Satus in res. 
     */
    static async register(req, res) {
        try {
            const newUser = await AccessService.registerUser(req.body);

            return res.json({ message: "Registration successful", user: newUser });
        } catch (error) {
          return res.status(400).json({ message: error.message });
        }
    }

    /**
     * get All Applications in the databas.
     * @param {*} req 
     * @param {*} res 
     * @returns applications
     */
    static async getAllApplications(req, res) {
        try {
            const applications = await AppService.fetchAllApplications();
            return res.json(applications);
        } catch (error) {
            console.error("Error retrieving applications:", error);
            return res.status(500).json({ message: error.message });
        }
    }

    /**
     * Delete Availability 
     * @param {*} req {req.params} Extract ID from request params
     * @param {*} res 
     * @returns status from the program
     */
    static async deleteAvailability(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "Availability ID is required" });
            }
    
            const result = await UserService.deleteAvailability(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Availability not found" });
            }
    
            res.status(200).json({ message: "Availability deleted successfully" });
        } catch (error) {
            console.error("Error deleting availability:", error);
            res.status(500).json({ message: "Failed to delete availability" });
        }
    }
    
    /**
     * delete Competence for the user
     * @param {*} req {req.params}  Extract ID from request params
     * @param {*} res 
     * @returns 
     */
    static async deleteCompetence(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "Competence ID is required" });
            }
    
            const result = await UserService.deleteCompetence(id);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Competence not found" });
            }
    
            res.status(200).json({ message: "Competence deleted successfully" });
        } catch (error) {
            console.error("Error deleting competence:", error);
            res.status(500).json({ message: "Failed to delete competence" });
        }
    }

    /**
     * add Competence
     * @param {*} req { id, comp_id, startDate, endDate } = req.body Extract ID from request params
     * @param {*} res 
     * @returns 
     */
    static async addCompetence(req, res){
        try {
            const { id, comp_id, startDate, endDate } = req.body;
            if (!id) {
                return res.status(400).json({ message: "Competence ID is required" });
            }
            const yearsOfExperience = ((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24 * 365.25)).toFixed(2);

            const result = await UserService.addCompetence(id, comp_id, yearsOfExperience);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Competence could not be added" });
            }
    
            res.status(200).json({ message: "Competence added successfully" });
        } catch (error) {
            console.error("Error adding competence:", error);
            res.status(500).json({ message: "Failed to add competence" });
        }
    }

    /**
     * add Availability
     * @param {*} req { id, fromDate, toDate } = req.body
     * @param {*} res 
     * @returns 
     */
    static async addAvailability(req, res){
        try {
            const { id, fromDate, toDate } = req.body;
            if (!id) {
                return res.status(400).json({ message: "Person ID is required" });
            }
    
            const result = await UserService.addAvailability(id, fromDate, toDate);
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Availability could not be added" });
            }
    
            res.status(200).json({ message: "Availability added successfully" });
        } catch (error) {
            console.error("Error adding availability:", error);
            res.status(500).json({ message: "Failed to add availability" });
        }
    }
    
}



module.exports = Controller;
