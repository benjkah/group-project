const UserDAO = require("../integration/userDAO");
const Authorization = require("../middleware/authMiddleware");

class AccessService {
    static async loginUser(username, password, res) {
        try {
            const user = await UserDAO.verifyLogin(username, password);
            if (!user) {
                throw new Error("Invalid username or password.");
            }
// GENERATE the token jwt after the user is exist
            Authorization.sendCookie(user, res);
//return the value 
            return user;
        } catch (error) {
          
            throw new Error("Login failed.");
        }
    }
}

module.exports = AccessService;
