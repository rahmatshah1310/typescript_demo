import { useEffect, useState } from "react";
import { AvatarUpload, Button, Footer, PostDetails, PostTab, Skeleton, Tab } from "@components";
import { ROUTES, ICONS, tabs } from "@constants";
// import AvatarUpload from "./components/AvatarUpload";
import { data, Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
// import PostDetails from "@pages/Profile/components/PostDetails";
// import { UserPosts } from "@hooks/UserPosts";
// import { Skeleton } from "@/components/ui/skeleton";
// import FollowModal from "./components/FollowModal";
// import { useUser } from "@features/context/FollowerContext";
import { Post } from "@/types/post";
import { User } from "@/types/user";
import { useAuthContext } from "@context";
import { useComments, usePosts } from "@api";

const Profile: React.FC = () => {
  const { data: posts = [], isLoading: postLoading } = usePosts() || {};
  const { data: comments = [], isLoading: loadingComments } = useComments(posts.id);
  console.log(comments, "comments");
  const [activeTab, setActiveTab] = useState<string>("posts");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [profile, setProfile] = useState<User | null>(null);
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [isFollowModalOpen, setIsFollowModalOpen] = useState<boolean>(false);
  // const [followType, setFollowType] = useState<string>("");
  // const [followUsers, setFollowUsers] = useState<User[]>([]);

  const { user, loading } = useAuthContext();
  // const { posts, loading } = UserPosts(user?.uid);
  const navigate = useNavigate();
  const location = useLocation();

  const openPostModal = (post: Post) => {
    navigate(`/${post.id}`);
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  const TabContent = () => {
    if (postLoading) {
      return (
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[...Array(9)].map((_, idx) => (
            <div key={idx}>
              <Skeleton className="h-[250px] bg-gray-800 w-full rounded" />
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === "posts") {
      return !posts && user?.uid === user?.uid ? (
        <PostTab />
      ) : (
        <div className="mt-8 grid grid-cols-3 gap-4">
          {posts?.map((post) => (
            <div key={post.id} className="relative group cursor-pointer" onClick={() => openPostModal(post)}>
              <img src={post.imageUrl} alt={post.caption} className="w-full  md:h-[300px] rounded object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-white font-semibold flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <ICONS.likeOutline />
                    <span>{post.likes?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ICONS.comment />
                    <span>{comments.length || 0}</span>
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
          <div className="md:w-1/3 lg:w-1/4">
            <AvatarUpload className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto" />{" "}
          </div>
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
              <h1 className="text-xl sm:text-2xl">{user.username}</h1>
              {user ? (
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
              <Button onClick={() => openFollowModal("followers")} className="text-sm sm:text-base">
                <strong>{profile?.followers?.length || 0}</strong> followers
              </Button>
              <Button onClick={() => openFollowModal("following")} className="text-sm sm:text-base">
                <strong>{profile?.following?.length || 0}</strong> following
              </Button>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="font-medium">{user?.fullName}</h2>
            </div>
          </div>
        </div>
        <Tab tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="overflow-x-auto sm:overflow-visible" />
        <div className="px-2 sm:px-0">
          <TabContent />
        </div>
      </div>
      <Footer />
      {/* <FollowModal isOpen={isFollowModalOpen} onClose={() => setIsFollowModalOpen(false)} users={followUsers} post={posts} type={followType} /> */}
      {selectedPost && <PostDetails isOpen={isModalOpen} onClose={closePostModal} user={user} post={selectedPost} showDeleteButton={true} />}
    </>
  );
};

export default Profile;
