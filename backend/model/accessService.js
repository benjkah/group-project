const UserDAO = require("../integration/userDAO");
const Authorization = require("../middleware/authMiddleware");



/**
 * Check if the value is not empty.
 * @param {string} text Name of the Funtion 
 * @param {*} value the value
 */
function checkvalue(text, value){
  if(!value) throw new Error(text + " is missing, fields are required.");
} 

class AccessService {

    /**
     * Check if the user can login
     * 
     * check if the application id exist
     * if not creat a apllication
     * 
     * GENERATE the token jwt after the user is exist
     * return the value  user and application id
     * @param {string} username 
     * @param {string} password 
     * @param {*} res 
     * @returns user, application_id: application.application_id
     */
    static async loginUser(username, password, res) {
        try {
            const user = await UserDAO.verifyLogin(username, password);
            if (!user) {
                throw new Error("Invalid username or password.");
            }

            let application = await UserDAO.findApplication(user.person_id);

            if (!application) {
              application = await UserDAO.createApplication(user.person_id);
          }

          Authorization.sendCookie(user, res);

          return { ...user, application_id: application.application_id };
        } catch (error) {
            throw new Error("Login failed.");
        }
    }

    

    /**
     * Logout the user,
     * The remove the cooki.
     * @param {*} res 
     * @returns 
     */
    static async logoutUser(res) {
      try {
          Authorization.removeCookie(res);
          return { message: "Logout successful."};
      } catch (error) {
          // console.error("Logout error:", error.message);
          throw new Error("Error during logout.");
      }
  }

    /**
     * Cerat a new user
     * {string} name
     * {string} surname 
     * {string} pnr YYYYMMDD-XXXX or YYMMDD-XXXX, Personal identification number
     * {string} email text@text.se
     * {string} username 
     * {string} password 
     * {number} role_id, If no value, set to 2. 
     * 
     * @param {name, surname, pnr, email, username, password, (role_id - optional.)} param 
     * @returns 
     */
    static async registerUser({
        name,
        surname,
        pnr,
        email,
        username,
        password,
        role_id = 2
      }) {

        
        try {
          checkvalue("Name", name)
          checkvalue("Surname", surname)
          checkvalue("Personal identification number", pnr)
          checkvalue("Email", email)
          checkvalue("Username", username)
          checkvalue("Password", password)

          if(!email.match(/^\S+@\S+\.\S+$/)) throw new Error("Email: " + email + " is invalid");  

          const fn = /\b([1-9]{1}[0-9]{3}||[0-9]{2})([0-1])([0-9])([0-3]||[6-9])([0-9])-\d{4}\b/;
          if(!pnr.match(fn)) throw new Error("Personal identification number " + pnr + " is invalid, will have formed YYYYMMDD-XXXX or YYMMDD-XXXX");

        } catch (error) {
          throw new Error(error.message);
        }
        
        if (!name || !surname || !pnr || !email || !username || !password) {
          throw new Error("All fields are required.");
        }
        
        const existingUser = await UserDAO.findByUsernameOrEmailOrPnr(
          username,
          email,
          pnr
        );
    
        if (existingUser) {
          if (existingUser.username === username) {
            throw new Error("Username " + username + "is already taken.");
          }
          if (existingUser.email === email) {
            throw new Error("Email " + email + " is already registered.");
          }
          if (existingUser.pnr === pnr) {
            throw new Error("Personal identification number " + pnr + " already exists.");
          }
          throw new Error("User already exists.");
        }
    
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
