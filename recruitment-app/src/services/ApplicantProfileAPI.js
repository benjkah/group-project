import axios from 'axios';


const API_BASE_URL = "http://localhost:4000"|| process.env.REACT_APP_BACKEND_URL ;
export async function fetchProfile() {
    try {
        const response = await fetch(`${API_BASE_URL}/user/profile`, {
            method: "GET",
            credentials: "include", 
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message || "Failed to fetch profile.");
        }
        
        return await response.json();
    } catch (error) {
        throw new Error("Server error: " + error.message);
    }
}

export async function fetchCompetences(lan){
    try {
        const response = await fetch(`${API_BASE_URL}/app/competences/${lan}`, {
            method: "GET", 
        });

        if (!response.ok) {
            const errorMessage = await response.json();
            throw new Error(errorMessage.message || "Failed to fetch competences.");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Server error: " + error.message);
    }
}

export async function deleteAvailability(id) {
    try {
        const response = await axios.delete(`${API_BASE_URL}/user/deleteAvail/${id}`);

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred during deletion.');
    }
}


export async function deleteCompetence(id){
    try {
        const response = await axios.delete(`${API_BASE_URL}/user/deleteComp/${id}`);
    
        return response.data;
      } catch (error) {
        throw new Error(error.response?.data?.message || 'An error occurred during deletion.');
      }
}

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

