export const getApiUrl = () => {
    return import.meta.env.DEV 
        ? 'http://localhost:5000' 
        : (import.meta.env.VITE_BACKEND_URL || 'https://forextrading-website.onrender.com');
};

export const API_URL = getApiUrl();
