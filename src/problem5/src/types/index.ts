export interface User {
  id: number;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Resource {
  id: number;
  name: string;
  description: string;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateResourceDto {
  name: string;
  description: string;
}

export interface UpdateResourceDto {
  name?: string;
  description?: string;
}

export interface FilterResourceDto {
  name?: string;
  page?: number;
  limit?: number;
}

export interface CreateUserDto {
  email: string;
  password: string;
}

export interface SignInDto {
  email: string;
  password: string;
} 