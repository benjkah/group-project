import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";

function RegistrationView({ onLogin, onRegister, userModel, mode }) {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [pnr, setPNR] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();


  async function handleSubmit(e) {
    e.preventDefault();

    const userData = {
      name,
      surname,
      pnr,
      email,
      username,
      password,
      confirmPass,
      role_id: 2 // default applicant, or let them choose if recruiter should be able to register as well
    };
    

    const result = await onRegister(userData);
    e.preventDefault();
    if (!result.success) {
      alert(result.message);
    } else {
      alert("Registration successful! Logging you in...");
      const result = await onLogin(username, password);
      if (!result.success) {
        alert(result.message);
      } else {
        navigate("/profile");
    }
  }
}

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name</label>
          <input 
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Surname</label>
          <input 
            type="text"
            value={surname}
            onChange={e => setSurname(e.target.value)}
            required
          />
        </div>

        <div>
          <label>PNR</label>
          <input 
            type="text"
            value={pnr}
            onChange={e => setPNR(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input 
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Username</label>
          <input 
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Confirm Password</label>
          <input 
            type="password"
            value={confirmPass}
            onChange={e => setConfirmPass(e.target.value)}
            required
          />
        </div>
        {password !== confirmPass && confirmPass.length > 0 && (
          <div className="error-message">Passwords do not match</div>
        )}
        <button type="submit">
          Sign Up
        </button>
      </form>
      <p>Already have an account?</p>
    </div>
  );
}

export default observer(RegistrationView);