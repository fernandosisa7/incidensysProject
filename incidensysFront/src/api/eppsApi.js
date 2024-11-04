import axios from './axios';

export const getEppsRequest = () => axios.get('/epps');

export const getEppRequest = (id) => axios.get(`/epps/${id}`);

export const createEppRequest = (epp) => axios.post('/epps', epp);

export const updateEppRequest = (id, epp) => axios.put(`/epps/${id}`, epp);

export const deleteEppRequest = (id) => axios.delete(`/epps/${id}`);
