import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

function LoginView({ onLogin, onRegister, userModel, mode }) {
  console.log("LoginView.js");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    console.log("userModel LoginView -> handleSubmit first", userModel);
    e.preventDefault();
    console.log("userModel LoginView -> handleSubmit second", userModel);
    const result = await onLogin(username, password);
    if (!result.success) {
      console.log("userModel LoginView -> handleSubmit third", userModel);
      alert(result.message);
    } else {
      console.log("userModel LoginView -> handleSubmit fourth", userModel);
      if (userModel.role_id === 2) {
        navigate("/profile");
      } else {
        console.log("just to get the error msg away. this also needs to be fixed if we are to have seperate routings depending on if recruiter or appl logs in")
        navigate("/profile"); // if we need separate routing for recruiters, now it just links to the same as applicants
      }
    }
  }

  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input 
            type="text" 
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
        <button type="button" onClick={() => navigate("/register")}>
          Need to create an account?
        </button>
      </form>
    </div>
  );
}

export default observer(LoginView);
