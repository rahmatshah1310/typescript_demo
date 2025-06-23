import { useMutation,useQueryClient } from "@tanstack/react-query";
import {ProfileService} from "@services";

export const useAddProfilePicMutation = () => {
  const queryClient=useQueryClient()
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await ProfileService.addProfilePic(formData);
    },
    onSuccess: () => {
      alert("Post created successfully!");
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
    onError: (error: any) => {
      alert(`Post creation failed: ${error?.message || "Unknown error"}`);
    },
  });
};

//mutation for profile
export const useUpdateProfileMutation = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await ProfileService.updateProfile(formData);
    },
  });
};
