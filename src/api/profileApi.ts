import { followUser, getAllUsers, getUserProfile, unfollowUser, uploadAvatar } from "@services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserProfile = (uid: string | undefined) => {
  return useQuery({
    queryKey: ["userProfile", uid],
    queryFn: () => {
      if (!uid) throw new Error("UID is required");
      return getUserProfile(uid);
    },
    enabled: !!uid,
  });
};

export const useAllUsers = () => {
  return useQuery({
    queryKey: ["allUsers"],
    queryFn: getAllUsers,
  });
};

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: ({ file, userId }: { file: File; userId: string }) => uploadAvatar(file, userId),
  });
};

export const useFollowUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ currentUserId, targetUserId }: { currentUserId: string; targetUserId: string }) => followUser(currentUserId, targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};

export const useUnfollowUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ currentUserId, targetUserId }: { currentUserId: string; targetUserId: string }) => unfollowUser(currentUserId, targetUserId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile"] });
    },
  });
};
