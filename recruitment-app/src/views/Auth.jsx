import React, { useState } from 'react';

function Auth() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  //const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const username = "username"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      // Call login endpoint
      console.log('Logging in with', { username, password });
    } else {
      // Validate passwords match
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      // Call registration endpoint
      console.log('Registering with', { username, password });
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '0 auto' }}>
      <h2>{isLoginMode ? 'Login' : 'Create Account'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input 
            type="username"
            placeholder="Username" 
            required 
          />
        </div>

        <div>
          <label>Password</label>
          <input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            placeholder="Password" 
            required 
          />
        </div>

        {!isLoginMode && (
          <div>
            <label>Confirm Password</label>
            <input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} 
              required 
            />
          </div>
        )}

        <button type="submit">
          {isLoginMode ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <button onClick={() => setIsLoginMode(!isLoginMode)} style={{ marginTop: '10px' }}>
        {isLoginMode ? 'Need to create an account?' : 'Already have an account?'}
      </button>
    </div>
  );
}

export default Auth;
