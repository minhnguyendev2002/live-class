import axios from 'axios';

const authToken = localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : undefined;

const instance = axios.create({
    baseURL: process.env.API_HOST || 'http://localhost:3000/api',
    headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${authToken}`,
    },
});

export const login = (params) => instance.post('/u/sessions/login', params).then((_) => _.data);
export const getCurrentUser = (params) => instance.get('/u/sessions/account', params).then((_) => _.data);

export const getAllMessage = (params) => instance.get('/u/live-chat', params).then((_) => _.data);
export const createMessage = (params) => instance.post('/u/live-chat', params).then((_) => _.data);