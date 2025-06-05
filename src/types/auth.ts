export interface User {
  id: string;
  email: string;
  userName: string;
  fullName: string;
  avatar?: string;
  bio?: string;
  website?: string;
  followers?: number;
  following?: number;
  posts?: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  userName: string;
  fullName: string;
}