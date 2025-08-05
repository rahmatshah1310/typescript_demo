import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  commentOnPost,
  createPost,
  CreatePostInput,
  deleteComment,
  deletePost,
  dislikePost,
  getComments,
  getPostById,
  getPosts,
  likePost,
  uploadPostImage,
} from "@services";

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePostInput) => createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const usePosts = () => {
  return useQuery({
    queryKey: ["posts"],
    queryFn: getPosts,
  });
};

export const useUploadPostImage = () => {
  return useMutation({
    mutationFn: (file: File) => uploadPostImage(file),
  });
};

export const useGetPostById = (postId: string, enabled = true) => {
  return useQuery({
    queryKey: ["post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId && enabled,
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useCommentOnPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: commentOnPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useComments = (postId: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });
};

export const useDeleteCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export const useLikePostMutation = () => {
  return useMutation({
    mutationFn: likePost,
  });
};

export const useDislikePostMutation = () => {
  return useMutation({
    mutationFn: dislikePost,
  });
};
