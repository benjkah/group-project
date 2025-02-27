import { observer } from "mobx-react-lite";
import { login as apiLogin, register as apiRegister } from "../services/AuthAPI";


/**
 * mode can be "login" or "register"
 * @param {userModel, view: ViewComponent, mode } param
 * @returns 
 */
function AuthPresenter({ userModel, view: ViewComponent, mode }) {

  async function login(username, password) {
    if (!username || !password) {
      return { success: false, message: "Username/Password required." };
    }

    try {
      const data = await apiLogin(username, password);

      // Update the model with data returned from the API
      userModel.setPersonID(data.person_id)
      userModel.setUsername(data.username);
      userModel.setName(data.name);
      userModel.setSurname(data.surname);
      userModel.setPNR(data.pnr);
      userModel.setEmail(data.email);
      userModel.setRole(data.role_id);
      userModel.setLoggedIn(true);

      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }


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
      userModel.setRole(data.role_id);
      userModel.setLoggedIn(true);


      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }

  // pass the correct handlers to the ViewComponent
  return (
    <ViewComponent

      mode={mode}         
      onLogin={login}
      onRegister={registerUser}
      userModel={userModel}
    />
  );
}
export default observer(AuthPresenter);