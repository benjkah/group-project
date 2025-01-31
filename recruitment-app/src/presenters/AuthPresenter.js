import { observer } from "mobx-react-lite";
import userModel from "../models/UserModel"; 


function AuthPresenter({ view: ViewComponent, mode }) {
  // mode can be "login" or "register" 

  console.log("AuthPres")

  async function login(username, password) {
    // basic validation
    if (!username || !password) {
      return { success: false, message: "Username/Password required." };
    }

    // test username/pass
    const mockIsValid = (username === "test" && password === "123");
    if (!mockIsValid) {
      return { success: false, message: "Invalid credentials." };
    }

    // on success, update userModel
    userModel.setUsername(username);
    userModel.setLoggedIn(true);
    return { success: true };
  }

  async function registerUser(userData) {
    if (!userData.name || !userData.surname || !userData.pnr ||
        !userData.email || !userData.username || !userData.password) {
      return { success: false, message: "All fields are required." };
    }
    if (userData.password !== userData.confirmPass) {
      return { success: false, message: "Passwords do not match." };
    }


    userModel.setName(userData.name);
    userModel.setSurname(userData.surname);
    userModel.setPNR(userData.pnr);
    userModel.setEmail(userData.email);
    userModel.setUsername(userData.username);
    userModel.setPassword(userData.password);
    userModel.setRole(userData.role_id || 1);
    userModel.setLoggedIn(true);

    return { success: true };
  }

  // pass the correct handlers to the ViewComponent
  return (
    <ViewComponent
      mode={mode}          // login or register
      onLogin={login}
      onRegister={registerUser}
      userModel={userModel}
    />
  );
}

export default observer(AuthPresenter);