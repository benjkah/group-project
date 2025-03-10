import axios from "axios";
const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
//const API_BASE_URL = "http://localhost:4000"|| process.env.REACT_APP_BACKEND_URL ;
/**
 * Fetches the application profile for a given user.
 * 
 * Sends a GET request to retrieve application details associated with the given user ID.
 * If the request is successful, it returns the application data.
 * If an error occurs, a relevant error message is thrown.
 * 
 * @param {number} id - The ID of the user whose application profile is being fetched.
 * @returns {Promise<Object>} A promise resolving to the application profile data.
 * @throws {Error} If fetching the profile fails, an error message is thrown.
 */
export async function fetchApplication(id) {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/applicantProfile/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Server error: " + error.message);
  }
}


/**
 * Changes the status of an application.
 * 
 * Sends a POST request to update the application status by assigning a handler.
 * If the request is successful, it returns the updated application data.
 * If an error occurs, a relevant error message is thrown.
 * 
 * @param {number} id - The ID of the application to be updated.
 * @param {number} handleId - The ID of the handler who will process the application.
 * @returns {Promise<Object>} A promise resolving to the updated application data.
 * @throws {Error} If updating the application status fails, an error message is thrown.
 */
export async function changeApplicationStatus(id, handleId) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/user/applicationStatus/${id}`,
        { handleId },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Server error: " + error.message);
    }
  }


