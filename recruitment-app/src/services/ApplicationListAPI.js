export async function fetchApplications() {
    try {
      const response = await fetch('/api/applications', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
  
      if (!response.ok) {
        let errorMessage = 'Failed to fetch applications.';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = response.statusText || errorMessage;
        }
        throw new Error(errorMessage);
      }
  
      return await response.json();
    } catch (error) {
      throw new Error("Server error: " + error.message);
    }
  }
  