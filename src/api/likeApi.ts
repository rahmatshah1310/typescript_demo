import { useMutation } from "@tanstack/react-query";
import { LikeService } from "@services";

export const useLikeMutation = () => {
  return useMutation({
    mutationFn: ({ postId }: { postId: string}) =>
      LikeService.likePost(postId),
  });
};

//mutation for dislike
export const useDislikeMutation = () => {
  return useMutation({
    mutationFn: ({ postId }: { postId: string}) =>
      LikeService.dislikePost(postId),
  });
};
