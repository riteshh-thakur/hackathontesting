import axios from 'axios';

// Create an instance of axios with custom configuration
export const apiClient = axios.create({
    baseURL: 'http://localhost:8080', // Replace with your API base URL
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' }
});

// Example GET request
 