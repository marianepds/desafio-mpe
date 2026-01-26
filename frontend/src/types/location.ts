export interface Location {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
export interface CreateLocationDto {
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
}
export interface UpdateLocationDto {
  name?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
}
export interface ApiResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}