import axios from 'axios'

/**
 * Fetches the list of applications from the server.
 * 
 * Sends a GET request to retrieve all applications. If the request is successful, 
 * it returns the application data. If an error occurs, it attempts to extract a 
 * meaningful error message from the server response.
 * 
 * @returns {Promise<Object>} A promise resolving to the fetched application data.
 * @throws {Error} If the request fails, an error message is thrown.
 */
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
