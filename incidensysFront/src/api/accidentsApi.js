import axios from './axios';

export const getAccidentsRequest = () => axios.get('/accidents');

export const getAccidentRequest = (id) => axios.get(`/accidents/${id}`);

export const createAccidentRequest = (accident) => axios.post('/accidents', accident);

export const updateAccidentRequest = (id, accident) => axios.put(`/accidents/${id}`, accident);

export const deleteAccidentRequest = (id) => axios.delete(`/accidents/${id}`);
