import { useMutation } from "@tanstack/react-query";
import { PostService } from "@services";


export const usePostMutation = () => {
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await PostService.createPost(formData);
    },
  });
};