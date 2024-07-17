import axios from 'axios';

// Base URL of your deployed API
const BASE_URL = 'https://your-azure-app-service-url/api';

export const getMenu = async () => {
    const response = await axios.get(`${BASE_URL}/GetMenu`);
    return response.data;
};

export const getOrders = async () => {
    const response = await axios.get(`${BASE_URL}/GetOrders`);
    return response.data;
};

export const createOrder = async (order) => {
    const response = await axios.post(`${BASE_URL}/CreateOrder`, order);
    return response.data;
};
