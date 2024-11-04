import axios from './axios';

export const getIncidentsRequest = () => axios.get('/incidents');

export const getIncidentRequest = (id) => axios.get(`/incidents/${id}`);

export const createIncidentRequest = (incident) => axios.post('/incidents', incident);

export const updateIncidentRequest = (id, incident) => axios.put(`/incidents/${id}`, incident);

export const deleteIncidentRequest = (id) => axios.delete(`/incidents/${id}`);
