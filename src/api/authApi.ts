import { AuthService } from "services";

export const login = async (data: Record<string, string>) => {
  const response = await AuthService.login(data);
  if (!response) throw new Error("Login failed");
  return response.data;
};

export const signup = async (data: Record<string, string>) => {
  const response = await AuthService.signup(data);
  if (!response) throw new Error("Signup failed");
  return response.data;
};

export const logout = async () => {
  await AuthService.logout(); // if you have such a method
};

export const fetchCurrentUser = async () => {
  return await AuthService.getCurrentUser();
};
