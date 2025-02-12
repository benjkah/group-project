const API_BASE_URL = "http://localhost:4000";  

export async function fetchProfile() {
    console.log("Fetching profile from:", `${API_BASE_URL}/profile`);

    try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
           
                const errorData = await response.json();
                
                throw new Error(errorData.message || 'Attenpt failed.');
            
        }

        
        
        return await response.json();

    } catch (error) {
        
        throw new Error("Server error: " + error.message);
    }
}
