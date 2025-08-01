import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useAuthContext } from "@context";
import { InputField } from "../common";
import { useUploadAvatar } from "@api";
import * as React from "react";

const AvatarUpload: React.FC = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);

  const uploadAvatar = useUploadAvatar();
  const loading = uploadAvatar.isPending;

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (!file || !user.uid) return;

    uploadAvatar.mutateAsync(
      { file, userId: user.uid },
      {
        onSuccess: (imageUrl) => {
          setUser((prev) => ({ ...prev, profilePic: imageUrl }));
        },
        onError: (err: any) => {
          console.error(err);
          setError(err.message);
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center">
      <label className="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden mb-4 cursor-pointer">
        {user?.profilePic ? (
          <img src={user.profilePic} alt="Profile" className="object-cover w-full h-full" />
        ) : (
          <span className="text-gray-400">{uploading ? "Uploading..." : "No Image"}</span>
        )}
        <InputField type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} disabled={uploading} label="" />
      </label>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default AvatarUpload;
