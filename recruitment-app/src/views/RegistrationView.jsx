import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from 'react-router-dom';

function RegistrationView({ onRegister }) {
  console.log("RegView")

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [pnr, setPNR] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const passwordsMatch = "" // might not be optimal

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
    
    const passwordsMatch = password === confirmPass; // same here

    const result = await onRegister(userData);
    if (!result.success) {
      alert(result.message);
    } else {
      alert("Registration successful! Logging you in...");
      // navigate to user home page
    }
  }

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">First Name</label>
          <input 
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="surname">Surname</label>
          <input 
            type="text"
            value={surname}
            onChange={e => setSurname(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="pnr">PNR</label>
          <input 
            type="text"
            value={pnr}
            onChange={e => setPNR(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input 
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input 
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Confirm Password</label>
          <input 
            type="password"
            value={confirmPass}
            onChange={e => setConfirmPass(e.target.value)}
            required
          />
        </div>
        {!passwordsMatch && confirmPass.length > 0 && (
          <div className="error-message">Passwords do not match</div>
        )}
        <button type="submit">
          Sign Up
        </button>
      </form>
      <p>Already have an account? <Link to="/">Log in here</Link></p>
    </div>
  );
}

export default observer(RegistrationView);