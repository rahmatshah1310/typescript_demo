import React from "react";
import { Button } from "@components";
import { useAuth } from "@context";
import { InputField } from "@components";
import { useAddProfilePicMutation } from "@api";
// import AvatarUpload from "./components/AvatarUpload";
// import Tab from "./components/Tab";
// import PostTab from "./components/PostTab";
// import FollowModal from "./components/FollowModal";
// import PostDetails from "@pages";

const Profile:React.FC = () => {
  const { userData } = useAuth()

  const { mutate: uploadProfilePic,isLoading } = useAddProfilePicMutation();

  const handleUploadProfilePic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      uploadProfilePic(formData);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto p-4 sm:p-6 text-white mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-8 mb-6 md:mb-8">
          <div className="flex flex-col items-center">
            <label className="w-40 h-40 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden mb-4 cursor-pointer">
              {userData?.profilePic ? (
                <img
                  src={userData?.profilePic}
                  alt="Profile"
                  className="object-cover w-full h-full"
                />
              ) : (
                <span className="text-gray-400">
                  {isLoading ? "Uploading..." : "No Image"}
                </span>
              )}
              <InputField
                type="file"
                accept="image/*"
                inputClassname="hidden"
                onChange={handleUploadProfilePic}
              disabled={isLoading}
              />
            </label>
          </div>


          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
              <h1 className="text-xl sm:text-2xl">{userData?.userName}</h1>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button className="flex-1 sm:flex-none px-3 py-1.5 text-sm sm:text-base bg-gray-800 rounded-md font-medium">
                  Edit profile
                </Button>
                <Button className="flex-1 sm:flex-none px-3 py-1.5 text-sm sm:text-base bg-gray-800 rounded-md font-medium">
                  View archive
                </Button>
                <Button className="p-1.5 bg-gray-800 rounded-md">{/* Settings icon */}</Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-8 mb-4 justify-center sm:justify-start">
              <span className="text-center sm:text-left">
                <strong>{userData?.postCount}</strong> {userData?.postCount === 1 ? "post" : "posts"}
              </span>
              <Button className="text-sm sm:text-base">
                <strong>{userData?.followersCount}</strong> followers
              </Button>
              <Button className="text-sm sm:text-base">
                <strong>{userData?.followingCount}</strong> following
              </Button>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="font-medium">{userData?.fullName}</h2>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto sm:overflow-visible border-b border-gray-700">
          {/* <Tab /> */}
          <div className="flex gap-6 text-center">
            <Button className="py-2 px-4 border-b-2 border-white">Posts</Button>
            <Button className="py-2 px-4">Saved</Button>
            <Button className="py-2 px-4">Tagged</Button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {/* Dummy grid of posts */}
          {[...Array(6)].map((_, index) => (
            <div key={index} className="w-full h-[300px] bg-gray-800 rounded"></div>
          ))}
        </div>
      </div>

      {/* <FollowModal /> */}
      {/* <PostDetails /> */}
    </>
  );
};

export default Profile;
