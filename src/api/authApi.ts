import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginData, User } from "../types/auth";
import { login, signup, logout, fetchCurrentUser } from "../services/authServices";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(login, {
    onSuccess: () => {
      // Invalidate or refetch current user on successful login
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
};

export const useSignupMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(signup, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
};

export const useCurrentUserQuery = () => {
  return useQuery(["currentUser"], fetchCurrentUser, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};
