import axios from 'axios'

export async function fetchApplications() {
  try {
    const response = await axios.get("/app/applications");
    // Axios returns data in response.data
    return response.data;
  } catch (error) {
    let errorMessage = "Failed to fetch applications.";

    // If the error has a response (meaning the request was made and the server responded)
    if (error.response) {
      // Attempt to get a custom message from the server response
      if (error.response.data && error.response.data.message) {
        errorMessage = error.response.data.message;
      } else if (error.response.statusText) {
        errorMessage = error.response.statusText;
      }
    } else if (error.message) {
      // General error message if there's no response object
      errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
}
