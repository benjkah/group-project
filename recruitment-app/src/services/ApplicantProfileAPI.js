const API_BASE_URL = "http://localhost:4000";

export async function fetchProfile() {
    try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        if (!token) {
            throw new Error("No token available");
        }

        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}` 
            }
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
