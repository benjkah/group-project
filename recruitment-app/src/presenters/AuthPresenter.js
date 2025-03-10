import { observer } from "mobx-react-lite";
import { login as apiLogin, register as apiRegister } from "../services/AuthAPI";


/**
 * mode can be "login" or "register"
 * @param {userModel, view: ViewComponent, mode } param
 * @returns 
 */
function AuthPresenter({ userModel, view: ViewComponent }) {

  /**
   * Handles the login functionality. 
   * It checks for valid username and password, calls the API to login, and updates the user model on success.
   * 
   * @param {string} username - The username entered by the user.
   * @param {string} password - The password entered by the user.
   * @returns {Object} - Returns an object containing success status and an optional message.
   */
  async function login(username, password) {
    if (!username || !password) {
      return { success: false, message: "Username/Password required." };
    }

    try {
      const data = await apiLogin(username, password);

      userModel.reset();
      userModel.setPersonID(data.user.person_id)
      userModel.setUsername(data.user.username);
      userModel.setLoggedIn(true);
      userModel.setRoleID(data.user.role_id)

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }


  /**
   * Handles the registration functionality. 
   * It checks if all required fields are filled, validates password matching, and calls the API to register the user.
   * If successful, it updates the user model.
   * 
   * @param {Object} userData - The data entered by the user during registration.
   * @returns {Object} - Returns an object containing success status and an optional message.
   */
  async function registerUser(userData) {
    if (!userData.name || !userData.surname || !userData.pnr ||
        !userData.email || !userData.username || !userData.password) {
      return { success: false, message: "All fields are required." };
    }
    if (userData.password !== userData.confirmPass) {
      return { success: false, message: "Passwords do not match." };
    }

    try {
      const data = await apiRegister(userData);
      
      userModel.setPersonID(data.person_id)
      userModel.setUsername(data.username);
      userModel.setName(data.name);
      userModel.setSurname(data.surname);
      userModel.setPNR(data.pnr);
      userModel.setEmail(data.email);
      userModel.setRoleID(data.role_id);
      userModel.setLoggedIn(true);


      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // pass the correct handlers to the ViewComponent
  return (
    <ViewComponent        
      onLogin={login}
      onRegister={registerUser}
      userModel={userModel}
    />
  );
}
export default observer(AuthPresenter);