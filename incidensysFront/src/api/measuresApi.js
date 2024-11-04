import axios from './axios';

export const getMeasuresRequest = () => axios.get('/measures');

export const getMeasureRequest = (id) => axios.get(`/measures/${id}`);

export const createMeasureRequest = (measure) => axios.post('/measures', measure);

export const updateMeasureRequest = (id, measure) => axios.put(`/measures/${id}`, measure);

export const deleteMeasureRequest = (id) => axios.delete(`/measures/${id}`);
