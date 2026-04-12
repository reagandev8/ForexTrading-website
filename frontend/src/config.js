export const getApiUrl = () => {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:5000';
    }
    return 'https://forextrading-website.onrender.com';
};

export const API_URL = getApiUrl();
