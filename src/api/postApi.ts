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
  return useMutation({
    mutationFn: (data: CreatePostInput) => createPost(data),
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
  return useMutation({
    mutationFn: commentOnPost,
  });
};

export const useComments = (postId: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => getComments(postId),
    enabled: !!postId,
  });
};

export const useDeleteComment = () => {
  return useMutation({
    mutationFn: deleteComment,
  });
};

export const useLikePost = () => {
  return useMutation({
    mutationFn: likePost,
  });
};

export const useDislikePost = () => {
  return useMutation({
    mutationFn: dislikePost,
  });
};
