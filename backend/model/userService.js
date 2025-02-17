const UserDAO = require("../integration/userDAO");

class UserService {
    static async getUserProfile(person_id) {
        const userProfile = await UserDAO.findUserById(person_id);
        if (!userProfile) {
            throw new Error("Profile not found.");
        }

        userProfile.competencies = await UserDAO.findCompetencies(person_id);
        userProfile.availability = await UserDAO.findAvailability(person_id);

        return userProfile;
    }
}

module.exports = UserService;
