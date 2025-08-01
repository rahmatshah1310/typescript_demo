import { loginUser, signupUser } from "@services";
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
