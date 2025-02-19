const AccessService = require("../model/accessService");
const UserService = require("../model/userService");

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
}

module.exports = Controller;
