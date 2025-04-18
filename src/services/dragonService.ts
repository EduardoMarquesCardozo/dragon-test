import api from './api';

export const getDragon = () => api.get('/dragon');

export const getDragonById = (id: string) => api.get(`/dragon/${id}`);

export const createDragon = (data: any) => api.post('/dragon', data);

export const putDragon = (id: string, data: any) => api.put(`/dragon/${id}`, data);

export const deleteDragon = (id: string) => api.delete(`/dragon/${id}`);