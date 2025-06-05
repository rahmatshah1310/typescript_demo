import axios from "axios";
import type { LoginData, SignupData, User } from "@index";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const login = async (data: LoginData): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/login`, data);
  return response.data;
};

export const signup = async (data: SignupData): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/signup`, data);
  return response.data;
};

export const fetchCurrentUser = async (): Promise<User> => {
  const response = await axios.get(`${API_URL}/auth/me`, {
    withCredentials: true,
  });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await axios.post(`${API_URL}/auth/logout`, {}, { withCredentials: true });
};
