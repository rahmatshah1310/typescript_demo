import React, { useEffect, useState } from "react";
// import { getDocs, collection, query, where } from "firebase/firestore";
// import Footer from "@footer";
// import AvatarUpload from "./components/AvatarUpload";
// import PostTab from "./components/PostTab";
// import Tab from "./components/Tab";
// import { Button,Skeleton, } from "@components";
// import { tabs ,ROUTES,ICONS} from "@constants";
import { useAuth } from "@context";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
// import { fetchUserPosts } from "@/services/postService";
// import PostDetails from "@pages";
// import { UserPosts } from "@hooks/UserPosts";
// import { firestore } from "@/firebase";
// import { useUser } from "@/features/context/FollowerContext";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [followType, setFollowType] = useState("");
  const [followUsers, setFollowUsers] = useState([]);
  const { username } = useParams();
  const { user } = useAuth();
  // const { posts, loading } = UserPosts(user?.uid);
  /* <------------------------------- Implementing Route for PostDetails with id -------------------------------> */
  const navigate = useNavigate();
  const location = useLocation();
  const openPostModal = (posts) => {
    setSelectedPost(posts);
    navigate(`/p/${posts.id}`, {
      state: { backgroundLocation: location },
    });
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
    navigate(`/${username}`);
  };
  if (user?.username !== username) {
    return <Navigate to={ROUTES.not_available} replace />;
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!username) return;

      setIsLoading(true);
      try {
        const userRef = collection(firestore, "users");
        const q = query(userRef, where("username", "==", username));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const profileData = snapshot.docs[0].data();
          setProfile(profileData);
        } else {
          console.warn("No user found with username:", username);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, [username]);

  useEffect(() => {
    if (followUsers?.length || followType) {
      setIsFollowModalOpen(true);
    }
  }, [followUsers]);

  const openFollowModal = async (type) => {
    const userData = profile || user;
    if (!userData) return;

    setFollowType(type);
    const userIds = userData[type] || [];

    if (userIds?.length === 0) {
      setFollowUsers([]);
      setIsFollowModalOpen(true);
      return;
    }

    const usersQuery = query(
      collection(firestore, "users"),
      where("uid", "in", userIds.slice(0, 10))
    );
    const snapshot = await getDocs(usersQuery);
    const users = snapshot.docs.map((doc) => doc.data());
    setFollowUsers(users);
    setIsFollowModalOpen(true);
  };

  const TabContent = () => {
    if (loading) {
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
      return posts.length === 0 && user?.uid === user?.uid ? (
        <PostTab />
      ) : (
        <div className="mt-8 grid grid-cols-3 gap-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="relative group cursor-pointer"
              onClick={() => openPostModal(post)}
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full  md:h-[300px] rounded"
              />
              {/* Updated Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-white font-semibold flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    {ICONS.heartFilled}
                    <span>{post.likes?.length || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {ICONS.commentIcon}
                    <span>{post.commentCount || 0}</span>
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
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 sm:gap-8 mb-6 md:mb-8">
          <div className="md:w-1/3 lg:w-1/4">
            <AvatarUpload className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto" />
          </div>

          {/* Profile Info */}
          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
              <h1 className="text-xl sm:text-2xl">{username}</h1>
              {user ? (
                <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-3 py-1.5 text-sm sm:text-base bg-gray-800 rounded-md font-medium">
                    Edit profile
                  </button>
                  <button className="flex-1 sm:flex-none px-3 py-1.5 text-sm sm:text-base bg-gray-800 rounded-md font-medium">
                    View archive
                  </button>
                  <button className="p-1.5 bg-gray-800 rounded-md">
                    {/* Settings icon */}
                  </button>
                </div>
              ) : (
                <button className="px-4 py-1.5 text-sm sm:text-base bg-blue-500 rounded-md font-medium">
                  Follow
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-4 sm:gap-8 mb-4 justify-center sm:justify-start">
              <span className="text-center sm:text-left">
                <strong>{posts?.length}</strong> posts
              </span>
              <Button
                onClick={() => openFollowModal("followers")}
                className="text-sm sm:text-base"
              >
                <strong>{profile?.followers?.length || 0}</strong> followers
              </Button>
              <Button
                onClick={() => openFollowModal("following")}
                className="text-sm sm:text-base"
              >
                <strong>{profile?.following?.length || 0}</strong> following
              </Button>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="font-medium">{user?.fullName}</h2>
            </div>
          </div>
        </div>

        {/* Tabs */}
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
      </div>

      {/* <Footer /> */}
      <FollowModal
        isOpen={isFollowModalOpen}
        onClose={() => setIsFollowModalOpen(false)}
        users={followUsers}
        post={posts}
        type={followType}
      />
      {selectedPost && (
        <PostDetails
          isOpen={isModalOpen}
          onClose={closePostModal}
          post={selectedPost}
          user={user}
          showDeleteButton={true}
        />
      )}
    </>
  );
};

export default Profile;
