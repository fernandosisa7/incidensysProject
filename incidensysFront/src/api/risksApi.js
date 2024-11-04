import axios from './axios';

export const getRisksRequest = () => axios.get('/risks');

export const getRiskRequest = (id) => axios.get(`/risks/${id}`);

export const createRiskRequest = (risk) => axios.post('/risks', risk);

export const updateRiskRequest = (id, risk) => axios.put(`/risks/${id}`, risk);

export const deleteRiskRequest = (id) => axios.delete(`/risks/${id}`);
