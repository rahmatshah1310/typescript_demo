import { useState } from "react";
import { AvatarUpload, Button, Footer, PostDetails, PostTab, Skeleton, Tab, FollowModal, TabContent } from "@components";
import { ICONS, tabs } from "@constants";
import { useNavigate } from "react-router-dom";
import { Post } from "@types";
import { useAllUsers, usePosts } from "@api";
import { useAuthContext } from "@context";

const Profile: React.FC = () => {
  const { data: posts = [], isLoading: postLoading } = usePosts() || {};
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState<string>("posts");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOpenFollowModal, setIsOpenFollowModal] = useState<boolean>(false);
  const [followType, setFollowType] = useState<"followers" | "following" | null>(null);

  const { data: users } = useAllUsers();
  const navigate = useNavigate();

  const openPostModal = (post: Post) => {
    navigate(`/${post.id}`);
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const filteredUsers =
    followType === "followers"
      ? users?.filter((u) => user?.followers?.includes(u.uid)) || []
      : followType === "following"
      ? users?.filter((u) => user?.following?.includes(u.uid)) || []
      : [];

  return (
    <>
      <div className="max-w-5xl mx-auto p-4 sm:p-6 text-white mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-8 mb-6 md:mb-8">
          <div className="md:w-1/3 lg:w-1/4">
            <AvatarUpload className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto" />{" "}
          </div>
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
              <h1 className="text-xl sm:text-2xl">{user.username}</h1>
              {users ? (
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-3 py-1.5 text-sm sm:text-base bg-gray-800 rounded-md font-medium">Edit profile</button>
                  <button className="flex-1 sm:flex-none px-3 py-1.5 text-sm sm:text-base bg-gray-800 rounded-md font-medium">View archive</button>
                  <button className="p-1.5 bg-gray-800 rounded-md"></button>
                </div>
              ) : (
                <button className="px-4 py-1.5 text-sm sm:text-base bg-blue-500 rounded-md font-medium">Follow</button>
              )}
            </div>
            <div className="flex flex-wrap gap-4 sm:gap-8 mb-4 justify-center sm:justify-start">
              <span className="text-center sm:text-left">
                <strong>{posts?.length}</strong> posts
              </span>
              <Button onClick={() => setFollowType("followers")} className="text-sm sm:text-base">
                <strong>{user?.followers?.length || 0}</strong> followers
              </Button>
              <Button onClick={() => setFollowType("following")} className="text-sm sm:text-base">
                <strong>{user?.following?.length || 0}</strong> following
              </Button>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="font-medium">{user?.fullName}</h2>
            </div>
          </div>
        </div>
        <Tab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="overflow-x-auto sm:overflow-visible" />
        <div className="px-2 sm:px-0">
          <TabContent posts={posts} postLoading={postLoading} activeTab={activeTab} />
        </div>
      </div>
      <Footer />
      <FollowModal isOpen={!!followType} onClose={() => setFollowType(null)} type={followType} users={filteredUsers} isLoading={!users} />
      {selectedPost && <PostDetails isOpen={isModalOpen} onClose={closePostModal} user={user} post={selectedPost} showDeleteButton={true} />}
    </>
  );
};

export default Profile;
