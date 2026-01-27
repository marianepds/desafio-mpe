import axios from 'axios';
import type { Location, CreateLocationDto, UpdateLocationDto } from '../types/location';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5226/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const locationService = {
  getAll: async (search?: string, page: number = 1, pageSize: number = 20): Promise<Location[]> => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    params.append('page', page.toString());
    params.append('pageSize', pageSize.toString());
    
    const response = await api.get<Location[]>(`/locations?${params}`);
    
    return response.data;
  },
  getById: async (id: number): Promise<Location> => {
    const response = await api.get<Location>(`/locations/${id}`);
    return response.data;
  },
  create: async (data: CreateLocationDto): Promise<Location> => {
    const response = await api.post<Location>('/locations', data);
    return response.data;
  },
  update: async (id: number, data: UpdateLocationDto): Promise<void> => {
    await api.put(`/locations/${id}`, data);
  },
  delete: async (id: number): Promise<void> => {
    await api.delete(`/locations/${id}`);
  },
};