const UserModel = require("../integration/userDAO");
const Authorization = require("../middleware/authMiddleware");

class AccessService {
    static async loginUser(username, password, res) {
        const user = await UserModel.verifyLogin(username, password);

       
        if (!user || !user.person_id) {
            throw new Error("Invalid username or password.");
        }

        Authorization.sendCookie(user, res); 
        return user;
    }
}

module.exports = AccessService;
