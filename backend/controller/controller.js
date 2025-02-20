const AccessService = require("../model/accessService");
const UserService = require("../model/userService");
const AppService = require("../model/appService");

class Controller {
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

    static async getCompetences(req, res) {
        let lan = "en"; //temporary until global language is implemented
        try {
            const competences = await AppService.getCompetences(lan);
            res.status(200).json(competences);
        } catch (error) {
            console.error("Error fetching competences:", error);
            res.status(500).json({ message: error.message });
        }
    }
    
    static async register(req, res) {
        try {
          const { 
            name, 
            surname, 
            pnr, 
            email, 
            username, 
            password,
            role_id // optional
          } = req.body;
    
          // Call into the service
          const newUser = await AccessService.registerUser(
            name,
            surname,
            pnr,
            email,
            username,
            password,
            role_id
          );
    
          // On success, you can respond with the created user
          return res.json({ message: "Registration successful", user: newUser });
        } catch (error) {
          // Typically we'd check for 4xx vs 5xx,
          // but for simplicity, let's just return 400 with the error message
          return res.status(400).json({ message: error.message });
        }
    }

    static async deleteAvailability(req, res) {
        try {
            const { id } = req.params;  // Extract ID from request params
            if (!id) {
                return res.status(400).json({ message: "Availability ID is required" });
            }
    
            const result = await UserService.deleteAvailability(id); // Call the service layer
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Availability not found" });
            }
    
            res.status(200).json({ message: "Availability deleted successfully" });
        } catch (error) {
            console.error("Error deleting availability:", error);
            res.status(500).json({ message: "Failed to delete availability" });
        }
    }
    
    static async deleteCompetence(req, res) {
        console.log("cont");
        try {
            const { id } = req.params;  // Extract ID from request params
            if (!id) {
                return res.status(400).json({ message: "Competence ID is required" });
            }
    
            const result = await UserService.deleteCompetence(id); // Call the service layer
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: "Competence not found" });
            }
    
            res.status(200).json({ message: "Competence deleted successfully" });
        } catch (error) {
            console.error("Error deleting competence:", error);
            res.status(500).json({ message: "Failed to delete competence" });
        }
    }
    
}



module.exports = Controller;
