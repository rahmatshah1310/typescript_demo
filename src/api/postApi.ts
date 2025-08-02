import { useMutation } from "@tanstack/react-query";
import { createPost, CreatePostInput } from "@services";

export const useCreatePost = () =>
  useMutation({
    mutationFn: (data: CreatePostInput) => createPost(data),
  });
