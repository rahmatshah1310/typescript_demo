import { forgotPassword, loginUser, logoutUser, resetPassword, signupUser } from "@services";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
  return useMutation({
    mutationFn: ({ email, password, fullName, username }: { email: string; password: string; fullName: string; username: string }) => {
      return signupUser(email, password, fullName, username);
    },
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => {
      return loginUser(email, password);
    },
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: forgotPassword,
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: resetPassword,
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logoutUser,
  });
};
