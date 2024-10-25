const API_URL = process.env.VITE_API_URL;

export const load = async () => {
    console.log('Server Load Ran');

    const getWritings = async () => {
        const response = await fetch(`${API_URL}/writings`);
        const data = await response.json();
        return data;
    };

    return {
        writings: await getWritings(),
    };
};
