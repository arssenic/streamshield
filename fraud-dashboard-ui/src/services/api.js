import axios from 'axios';

// Connect to your Spring Boot Fraud Engine
const API_BASE_URL = 'http://localhost:8082';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fraudApi = {
    // Get total processed transactions count
    getTotalCount: async () => {
        const response = await apiClient.get('/frauds/count');
        return response.data;
    },
    
    // Get high-risk transactions
    getHighRisk: async () => {
        const response = await apiClient.get('/frauds/high-risk');
        return response.data;
    },

    // Get all transactions (we'll slice the recent ones on the frontend for now)
    getAllTransactions: async () => {
        const response = await apiClient.get('/frauds');
        return response.data;
    }
};