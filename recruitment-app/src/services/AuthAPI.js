const API_BASE_URL = "http://localhost:4000";

export async function login(username, password) {
    try {
        const response = await fetch(`${API_BASE_URL}/access/login`, {  
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
            credentials: "include" 
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Login failed.');
        }

        return await response.json(); 
    } catch (error) {
        throw new Error("Server error: " + error.message);
    }
}



  
  export async function register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/users`,  {

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
