import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export async function login(username, password) {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/access/login`,
      { username, password },
      { withCredentials: true }
    );

    console.log("login api call ", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred during login.');
  }
}

export async function register(userData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/access/register`, userData);
    console.log("register new user AuthAPI userData: ", userData)
    console.log("register new user AuthAPI response.data: ", response.data)

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'An error occurred during registration.');
  }
}