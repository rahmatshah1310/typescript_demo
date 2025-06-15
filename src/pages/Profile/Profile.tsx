import React, { useEffect, useState } from "react";
import { Button } from "@components";
import { useAuth } from "@context";
import { InputField, Skeleton, Tab } from "@components";
import { useAddProfilePicMutation, useGetAllPosts,} from "@api";
import { ICONS, tabs } from "@constants"
import PostTab from "./components/PostTab"
import { useNavigate, useParams } from "react-router-dom";
import PostDetails from "./components/PostDetails";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
// import AvatarUpload from "./components/AvatarUpload";
// import Tab from "./components/Tab";
// import PostTab from "./components/PostTab";
// import FollowModal from "./components/FollowModal";
// import PostDetails from "@pages";

const Profile: React.FC = () => {
  const { userData } = useAuth()
  const { data:posts, isLoading: isPostLoading, error,isSuccess} = useGetAllPosts();
  // console.log(post)
const location = useLocation();

  const uploadProfilePic = useAddProfilePicMutation();
  const [activeTab, setActiveTab] = useState<string | null>("posts")
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean | null>(false);
  const navigate = useNavigate()

    useEffect(() => {
      if (uploadProfilePic.status === "success") {
        toast.success(uploadProfilePic.data?.message || "Post uploaded successfully!");
      } else if (uploadProfilePic.status === "error") {
        const errorMessage = uploadProfilePic.error as any;
        toast.error(`Failed to create post!\n${errorMessage?.message || "Unknown error"}`);
      }
    }, [uploadProfilePic.status,uploadProfilePic]);

    console.log(selectedPost)

  const openPostModal = (posts) => {
    setSelectedPost(posts);
    navigate(`/p/${posts._id}`, {
      state: { backgroundLocation: location.pathname },
    });
    setIsModalOpen(true);
  };


  const closePostModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
    navigate(`/${userData.userName}`);
  };

  const handleUploadProfilePic = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      uploadProfilePic(formData);
    }
  };


  const TabContent = () => {

    if (isPostLoading) {
      return (
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[...Array(9)].map((_, idx) => (
            <Skeleton
              key={idx}
              className="h-[250px] bg-gray-800 w-full rounded"
            />
          ))}
        </div>
      );
    }

    if (activeTab === "posts") {
      return posts.length === 0 ? (
        <PostTab />
      ) : (
        <div className="mt-8 grid grid-cols-3 gap-4">
          {posts.map((post, index) => (
            <div
              key={index}
              className="relative group cursor-pointer"
              onClick={() => openPostModal(post)}
            >
              <img
                src={post.imageUrls}
                alt={post.caption}
                className="w-full  md:h-[300px] rounded object-cover"
              />
              {/* Updated Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-white font-semibold flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {ICONS.heartFilled}
                    <span>{post.likeCount}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {ICONS.commentIcon}
                    <span>{post.commentsCount || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === "saved") {
      return <div className="mt-8">Saved content</div>;
    }

    if (activeTab === "tagged") {
      return <div className="mt-8">Tagged content</div>;
    }

    return null;
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
                  {uploadProfilePic.isLoading ? "Uploading..." : "No Image"}
                </span>
              )}
              <InputField
                type="file"
                accept="image/*"
                inputClassname="hidden"
                onChange={handleUploadProfilePic}
                disabled={uploadProfilePic.isLoading}
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
      </div>

      <Tab
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="overflow-x-auto sm:overflow-visible"
      />

      {/* Tab Content */}
      <div className="px-2 sm:px-0">
        <TabContent />
      </div>
      {/* <FollowModal /> */}
      {selectedPost && (
        <PostDetails
          isOpen={isModalOpen}
          onClose={closePostModal}
          postId={selectedPost._id}
          user={userData}
          showDeleteButton={true}
        />
      )}
    </>
  );
};

export default Profile;
