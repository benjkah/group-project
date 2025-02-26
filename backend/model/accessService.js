const UserDAO = require("../integration/userDAO");
const Authorization = require("../middleware/authMiddleware");

class AccessService {
    static async loginUser(username, password, res) {
        console.log("accessService loginUser");
        try {
            const user = await UserDAO.verifyLogin(username, password);
            if (!user) {
                throw new Error("Invalid username or password.");
            }
//check if the application id exist
            let application = await UserDAO.findApplication(user.person_id);
//if not creat a apllication
            if (!application) {
              application = await UserDAO.createApplication(user.person_id);
          }
// GENERATE the token jwt after the user is exist
            Authorization.sendCookie(user, res);
//return the value  user and application id
return { ...user, application_id: application.application_id };
        } catch (error) {
          
            throw new Error("Login failed.");
        }
    }

    

    static async logoutUser(res) {
      try {
          Authorization.removeCookie(res);
          return { message: "Logout successful." };
      } catch (error) {
          console.error("Logout error:", error.message);
          throw new Error("Error during logout.");
      }
  }




    static async registerUser(
        name,
        surname,
        pnr,
        email,
        username,
        password,
        role_id = 2
      ) {
        // Basic field validation
        if (!name || !surname || !pnr || !email || !username || !password) {
          throw new Error("All fields are required.");
        }
    
        // Check if user (by username/email/pnr) already exists
        const existingUser = await UserDAO.findByUsernameOrEmailOrPnr(
          username,
          email,
          pnr
        );
    
        if (existingUser) {
          // Decide which message to show
          if (existingUser.username === username) {
            throw new Error("Username already taken.");
          }
          if (existingUser.email === email) {
            throw new Error("Email already registered.");
          }
          if (existingUser.pnr === pnr) {
            throw new Error("PNR already exists.");
          }
          throw new Error("User already exists.");
        }
    
        // Insert new user
        const newUser = await UserDAO.createUser({
          name,
          surname,
          pnr,
          email,
          username,
          password,
          role_id,
        });
    
        if (!newUser) {
          throw new Error("Registration failed.");
        }
    
        return newUser;
      }
}

module.exports = AccessService;
