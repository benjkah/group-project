import { useState } from "react";
import { observer } from "mobx-react-lite";
import { useNavigate, Link } from "react-router-dom";

function RegistrationView({ onLogin, onRegister, userModel, mode }) {

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [pnr, setPNR] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const navigate = useNavigate();


  /**
   * Handles the registration form submission.
   * Prevents default form behavior, collects user data, and attempts registration.
   * If registration is successful, automatically logs in the user and redirects to the profile page.
   * 
   * @param {Event} e - The form submit event.
   */
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
      role_id: 2 
    };
    

    const result = await onRegister(userData);
    
   
    
      if (!result.success) {
        alert(result.message);
      } else {
        userModel.reset();
        alert("Registration successful!");
        navigate("/profile");
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
          <label> Personal identity number </label>
          <input 
            type="text"
            placeholder="YYMMDD-XXXX"
            value={pnr}
            onChange={e => setPNR(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email address</label>
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
      <p>
        <Link to="/"> Already have an account?</Link>
      </p>
    </div>
  );
}

export default observer(RegistrationView);