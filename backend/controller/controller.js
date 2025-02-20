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
}



module.exports = Controller;
