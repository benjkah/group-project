import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

function LoginView({ onLogin, onRegister, userModel, mode,  }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await onLogin(username, password);
    if (!result.success) {
      alert(result.message);
    } else {
      // console.log("userModel LoginView -> handleSubmit ", userModel);
      navigate("/profile");
  }
}
  return (
    <div style={{ maxWidth: "300px", margin: "0 auto" }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username</label>
          <input 
            type="text" required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password" required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">
          Login
        </button>

        <button type="button" onClick={() => navigate("/register")}>
          Need to create an account?
        </button>
        
      </form>
    </div>
  );
}

export default observer(LoginView);