/**
 * Dynamic API URL Configuration
 * 
 * This utility ensures the app connects to the correct backend URL whether running on 
 * localhost, via IP address (network/mobile), or in production.
 */
const getApiUrl = () => {
    // If a production API URL is set (and not localhost), use it
    if (process.env.REACT_APP_API_URL && !process.env.REACT_APP_API_URL.includes('localhost')) {
        return process.env.REACT_APP_API_URL;
    }

    // Development / Local Network Fallback
    // This constructs the URL based on the browser's current hostname.
    // Examples:
    // - Desktop: http://localhost:3000 -> API: http://localhost:5000
    // - Mobile: http://192.168.1.5:3000 -> API: http://192.168.1.5:5000
    const protocol = window.location.protocol;
    const hostname = window.location.hostname;
    // Assume backend runs on port 5000 for development
    return `${protocol}//${hostname}:5000`;
};

export const API_URL = getApiUrl();
