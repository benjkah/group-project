const API_BASE_URL = "http://localhost:4000";

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

export async function fetchCompetences(){
    try {
        const response = await fetch(`${API_BASE_URL}/app/competences`, {
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

