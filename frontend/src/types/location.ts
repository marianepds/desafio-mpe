export interface CreateLocationDto {
  name: string;
  latitude: number;
  longitude: number;
  description: string;
}

export interface Location {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface UpdateLocationDto extends CreateLocationDto {
  id: string;
}