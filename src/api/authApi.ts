import { useMutation } from "@tanstack/react-query";
import {AuthService} from "@services"; // Adjust path

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: Record<string, string>) => {
      const response = await AuthService.login(data);
      if (!response) throw new Error("Login failed");
      return response.data;
    },
  });
};

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: async (data: Record<string, string>) => {
      const response = await AuthService.signup(data);
      if (!response) throw new Error("Signup failed");
      return response.data;
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      await AuthService.logout();
    },
  });
};

