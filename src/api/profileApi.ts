import { getUserProfile, uploadAvatar } from "@services";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export const useUploadAvatar = () => {
  return useMutation({
    mutationFn: ({ file, userId }: { file: File; userId: string }) => uploadAvatar(file, userId),
  });
};
