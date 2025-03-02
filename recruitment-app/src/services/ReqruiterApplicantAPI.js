

const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4000";

export async function fetchApplication(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/applicantProfile/${id}`, {
            method: "GET", 
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

export async function changeApplicationStatus(id, handleId) {
    try {
        const response = await fetch(`${API_BASE_URL}/user/applicationStatus/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ handleId }), 
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


