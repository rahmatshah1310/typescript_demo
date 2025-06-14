import { useMutation, useQuery } from "@tanstack/react-query";
import { PostService } from "@services";

// Create Post Mutation
export const usePostMutation = () => {
  return useMutation({mutationFn:PostService.createPost})
};

// Update Post Mutation
export const useUpdatePostMutation = () => {
  return useMutation({mutationFn: PostService.updatePost})
};

// Get All Posts Query
export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: PostService.getAllPosts,
  });
};


// Get Single Post Query
export const useGetSinglePost = (id: string) => {
  return useQuery({
    queryKey: ["post", id],
    queryFn: PostService.getSinglePost(id),
    enabled:!!id,
  });
};
