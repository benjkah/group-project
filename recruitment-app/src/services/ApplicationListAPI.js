import axios from 'axios';

const API_BASE_URL = 'http://localhost:4000';

export async function fetchApplicationList() {
  console.log("fetchApplicationList")
  try {
    const response = await axios.get(`${API_BASE_URL}/application`);
    console.log("fetchApplications response.data: ", response.data)
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message ||
        'An error occurred while fetching applications.'
    );
  }
}
