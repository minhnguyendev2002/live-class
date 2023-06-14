import axios from 'axios';

const authToken = localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : undefined;

const instance = axios.create({
    baseURL: process.env.API_HOST || 'http://localhost:3000',
    headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${authToken}`,
    },
});

export const login = (params) => instance.post('/api/u/sessions/login', params).then((_) => _.data);
export const getCurrentUser = (params) => instance.get('/api/u/sessions/account', params).then((_) => _.data);

export const getAllMessage = (params) => instance.get('/api/u/live-chat', params).then((_) => _.data);
export const createMessage = (params) => instance.post('/api/u/live-chat', params).then((_) => _.data);