import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.API_HOST || 'http://localhost:3000/api',
    headers: {
        'accept': 'application/json',
    },
});

export const getCurrentLive = (params) => instance.get('/lives', params).then((_) => _.data);
export const updateCurrentLive = (params) => instance.patch('/lives', params).then((_) => _.data);
export const deleteLive = (params) => instance.delete('/lives', params).then((_) => _.data);