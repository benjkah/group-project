import axios from 'axios';
import userModel from '../models/UserModel';

//const API_BASE_URL = "http://localhost:4000"|| process.env.REACT_APP_BACKEND_URL ;
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";


/**
 * Sends a login request to the server.
 * 
 * Attempts to authenticate a user with the provided username and password.
 * If successful, returns the authentication response. If an error occurs,
 * a meaningful error message is thrown.
 * 
 * @param {string} username - The user's username.
 * @param {string} password - The user's password.
 * @returns {Promise<Object>} A promise resolving to the authentication data.
 * @throws {Error} If login fails, an error message is thrown.
 */
export async function login(username, password) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/access/login`,
      { username, password },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred during login.');
  }
}

/**
 * Sends a logout request to the server.
 * 
 * Invalidates the user's session and removes authentication cookies.
 * If the request fails, an error message is thrown.
 * 
 * @returns {Promise<Object>} A promise resolving to the logout confirmation message.
 * @throws {Error} If logout fails, an error message is thrown.
 */
export async function logout() {
    try {
      const response = await fetch(`${API_BASE_URL}/access/logout`, {
            method: "POST",
            credentials: "include"
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Logout failed.");
        }

        return await response.json();
    } catch (error) {
        throw new Error("Error logging out: " + error.message);
    }
}

/**
 * Checks ifthe user is logged in. Otherwise, it sets the user as logged out.
 * 
 * @async
 * @function checkAuth
 * @returns This function does not return a value but updates the userModel values.
 */
export async function checkAuth() {
  try {
      const response = await axios.get(`${API_BASE_URL}/access/auth-check`, {
          withCredentials: true,  
      });

      if (response.data.isAuthenticated) {
          userModel.setLoggedIn(true);
         
      } else {
          userModel.setLoggedIn(false);
          
      }
  } catch (error) {
      
      userModel.setLoggedIn(false);
  }
}

/**
 * Registers a new user.
 * 
 * Sends a request to create a new user with the provided data.
 * If successful, returns the registration response. If an error occurs,
 * a meaningful error message is thrown.
 * 
 * @param {Object} userData - The user's registration details.
 * @returns {Promise<Object>} A promise resolving to the registration confirmation.
 * @throws {Error} If registration fails, an error message is thrown.
 */
export async function register(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/access/register`, userData);

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred during registration.');
  }
}