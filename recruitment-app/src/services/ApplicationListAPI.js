import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export async function fetchApplications() {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/applications`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch applications.');
  }
}
