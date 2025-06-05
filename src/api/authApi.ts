import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LoginData, SignupData, User } from "@types";
import { login, signup, logout, fetchCurrentUser } from "@services";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};


export const useSignupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
};


export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error>(logout, {
    onSuccess: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
};

export const useCurrentUserQuery = () => {
  return useQuery<User, Error>(["currentUser"], fetchCurrentUser, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });
};
