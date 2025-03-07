import { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

function LoginView({ onLogin, userModel }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  

  async function handleSubmit(e) {
    e.preventDefault();
    const result = await onLogin(username, password);
    console.log("role_id: ", userModel.role_id)
    if (!result.success) {
      alert(result.message);
    } 
  }

  useEffect(() => {
    if (userModel.isLoggedIn) {
      if (userModel.role_id === 2) {
        navigate("/profile");
      } else if (userModel.role_id === 1) {
        navigate("/applications");
      }
    }
  }, [userModel.isLoggedIn, userModel.role_id, navigate]);


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