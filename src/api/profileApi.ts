import { useMutation } from "@tanstack/react-query";
import {ProfileService} from "@services";

export const useAddProfilePicMutation = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await ProfileService.addProfilePic(formData);
    },
  });
};

export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await ProfileService.updateProfile(formData);
    },
  });
};
