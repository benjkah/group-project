import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export async function login(username, password) {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });

    console.log("login api call ", response.data)
    
    return response.data;
  } catch (error) {
    // Attempt to show a meaningful error message
    throw new Error(error.response?.data?.message || 'An error occurred during login.');
  }
}

export async function register(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred during registration.');
  }
}