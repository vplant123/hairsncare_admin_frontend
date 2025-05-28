export const getUtilityData = async () => {
    try {
        const response = await fetch(`${BASE_URL}/utility/getContent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify content type
            },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching utility data:', error);
        throw error; // Optionally, rethrow or handle the error as needed
    }
};
