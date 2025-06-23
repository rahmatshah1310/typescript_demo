import { useMutation, useQuery } from "@tanstack/react-query";
import { PostService } from "@services";

// Create Post Mutation
export const usePostMutation = () => {
  return useMutation({mutationFn:PostService.createPost})
};

export const useUpdatePostMutation = () => {
  return useMutation({mutationFn: PostService.updatePost})
};

export const useGetAllPosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: PostService.getAllPosts,
  });
};


// Get Single Post Query
export const useGetSinglePost = (postId: string) => {
  return useQuery({
    queryKey: ["singlePost", postId],
    queryFn:()=> PostService.getSinglePost(postId),
    enabled:!!postId,
  });
};

// Delete Post Mutation
export const useDeletePostMutation = () => {
  return useMutation({
    mutationFn: PostService.deletePost,
  });
};
