import { useMutation } from "@tanstack/react-query";
import { LikeService } from "@services";

export const useLikeMutation = () => {
  return useMutation({
    mutationFn: ({ postId }: { postId: string}) =>
      LikeService.likePost(postId),
  });
};


export const useDislikeMutation = () => {
  return useMutation({
    mutationFn: ({ postId }: { postId: string}) =>
      LikeService.dislikePost(postId),
  });
};
