const API_BASE_URL = 'http://localhost:4000';
 
 export async function login(username, password) {
    try {
      console.log("try login api");
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed.');
      }
      
      console.log("before return login");
      return await response.json();
    } catch (error) {
      throw new Error('Server error: ' + error.message);
    }
  }
  
  export async function register(userData) {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed.');
      }
  
      return await response.json();
    } catch (error) {
      throw new Error('Server error: ' + error.message);
    }
  }
  
  export async function getUserData(token) {
    try {
      const response = await fetch('/api/auth/me', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token  // assuming Bearer token authentication
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch user data.');
      }
      
      return await response.json();
    } catch (error) {
      throw new Error('Server error: ' + error.message);
    }
  }