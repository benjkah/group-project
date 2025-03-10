import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";
//const API_BASE_URL = "http://localhost:4000"|| process.env.REACT_APP_BACKEND_URL ;
/**
 * Fetches the profile information of the currently logged-in user.
 * 
 * Sends a GET request to the server with credentials included.
 * If the request fails, an error message is thrown.
 * 
 * @returns {Promise<Object>} A promise resolving to the user profile data.
 * @throws {Error} If the request fails or encounters an error.
 */
export async function fetchProfile() {
    try {
      const response = await axios.get(`${API_BASE_URL}/user/profile`, {
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
 * Fetches a list of competences based on the provided language.
 * 
 * Sends a GET request to retrieve competences in the specified language.
 * If the request fails, an error message is thrown.
 * 
 * @param {string} lan - The language code (e.g., "en", "sv").
 * @returns {Promise<Array>} A promise resolving to an array of competences.
 * @throws {Error} If the request fails or encounters an error.
 */

export async function fetchCompetences(lan) {
  try {
    const response = await axios.get(`${API_BASE_URL}/app/competences/${lan}`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Server error: " + error.message);
  }
}


/**
 * Deletes an availability entry for a user.
 * 
 * Sends a DELETE request to remove an availability entry by its ID.
 * If the request fails, an error message is thrown.
 * 
 * @param {number} id - The ID of the availability entry to delete.
 * @returns {Promise<Object>} A promise resolving to the server response.
 * @throws {Error} If the deletion fails or encounters an error.
 */
export async function deleteAvailability(id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/user/deleteAvail/${id}`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred during deletion.');
    }
}

/**
 * Deletes a competence entry for a user.
 * 
 * Sends a DELETE request to remove a competence entry by its ID.
 * If the request fails, an error message is thrown.
 * 
 * @param {number} id - The ID of the competence entry to delete.
 * @returns {Promise<Object>} A promise resolving to the server response.
 * @throws {Error} If the deletion fails or encounters an error.
 */
export async function deleteCompetence(id){
    try {
        const response = await axios.delete(`${API_BASE_URL}/user/deleteComp/${id}`);
    
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred during deletion.');
      }
}

/**
 * Adds a competence entry for a user.
 * 
 * Sends a POST request to add a competence entry with the specified details.
 * If the request fails, an error message is thrown.
 * 
 * @param {number} id - The user ID.
 * @param {number} comp_id - The competence ID.
 * @param {string} startDate - The start date of the competence in YYYY-MM-DD format.
 * @param {string} endDate - The end date of the competence in YYYY-MM-DD format.
 * @returns {Promise<Object>} A promise resolving to the server response.
 * @throws {Error} If the insertion fails or encounters an error.
 */
export async function addCompetence(id, comp_id, startDate, endDate){
    try {
        const response = await axios.post(`${API_BASE_URL}/user/addComp`, {
            id,
            comp_id,
            startDate,
            endDate
        });

        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred during insertion.');
      }
}

/**
 * Adds an availability period for a user.
 * 
 * Sends a POST request to add a new availability period with the specified details.
 * If the request fails, an error message is thrown.
 * 
 * @param {number} id - The user ID.
 * @param {string} fromDate - The start date of the availability period in YYYY-MM-DD format.
 * @param {string} toDate - The end date of the availability period in YYYY-MM-DD format.
 * @returns {Promise<Object>} A promise resolving to the server response.
 * @throws {Error} If the insertion fails or encounters an error.
 */
export async function addAvailability(id, fromDate, toDate) {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/addAvail`, {
            id,
            fromDate,
            toDate
        });
    
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred during insertion.');
      }
}

