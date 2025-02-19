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
}

module.exports = UserService;
