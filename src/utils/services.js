import axios from 'axios';

const baseURL = process.env.REACT_APP_API_HOST;
const authToken = localStorage.getItem('currentUser') ? localStorage.getItem('currentUser') : undefined;

const instance = axios.create({
    baseURL: baseURL,
    headers: {
        'accept': 'application/json',
        'Authorization': `Bearer ${authToken}`,
    },
});

export const login = (params) => instance.post('/api/u/sessions/login', params).then((_) => _.data);
export const getCurrentUser = (params) => instance.get('/api/u/sessions/account', params).then((_) => _.data);

export const getAllMessage = (params) => instance.get('/api/u/live-chat', params).then((_) => _.data);
export const createMessage = (params) => instance.post('/api/u/live-chat', params).then((_) => _.data);
export const deleteMessage = (id) => instance.delete(`/api/u/live-chat/${id}`).then((_) => _.data);