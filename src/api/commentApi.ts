import { useMutation, useQuery } from "@tanstack/react-query";
import { CommentService } from "@services";

// ✅ Create Comment Mutation
export const useCreateCommentMutation = () => {
  return useMutation({
    mutationFn: ({ postId, formData }: { postId: string; formData: FormData }) =>
      CommentService.addComment(postId, formData),
  });
};

// ✅ Get All Comments for a specific post
export const useGetAllComments = (postId: string) => {
  return useQuery({
    queryKey: ["comments", postId], 
    queryFn: () => CommentService.getAllComment(postId),
    enabled: !!postId, 
  });
};

export const useDeleteCommentMutation = () => {
  return useMutation({
    mutationFn: (commentId: string) => CommentService.deleteComment(commentId),
  });
};
