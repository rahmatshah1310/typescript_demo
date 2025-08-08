import React, { useState } from "react";
import { ICONS } from "@constants";
import { Button, HomeUsersSkeleton, PostSkeleton, CommentLikesFooter, Header, FollowUnFollowModal, PostDetails } from "@components";
import { useAuthContext } from "@context";
import { useGetPostsByFollowers, usePosts } from "@api";
import { User } from "@types";

interface HomeProps {
  user?: User;
}

const Home: React.FC<HomeProps> = () => {
  const { user } = useAuthContext();
  const { data: posts, isLoading: loading } = usePosts();
  const { data: users = [] } = useGetPostsByFollowers(user.following);
  const [isFollowModalOpen, setIsFollowModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPostModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closePostModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <section className="flex flex-col items-center gap-8 mt-10">
        <HomeUsersSkeleton />

        {[...Array(3)].map((_, idx) => (
          <PostSkeleton key={idx} />
        ))}
      </section>
    );
  }

  if (!posts || posts.length === 0) {
    return <div className="text-white text-center h-screen justify-center items-center w-full">No posts Available.</div>;
  }

  return (
    <section>
      <nav className="md:hidden">
        <Header />
      </nav>
      {/* Navbar section */}
      <div className="flex items-center w-full space-x-4 overflow-x-auto p-4">
        {users.map((user) => (
          <div key={user.id} className="flex-none flex flex-col items-center space-y-1 min-w-[5.5rem]">
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
              <div className="bg-black p-[2px] rounded-full">
                <img src={user.profilePic || "/fallback.jpg"} alt={user.username} className="w-20 h-20 aspect-square rounded-full object-cover" />
              </div>
            </div>
            <span className="text-white text-xs truncate max-w-[70px] text-center">{user.username}</span>
          </div>
        ))}
      </div>

      {/* Main section */}
      <section className="flex flex-col items-center justify-center ">
        {users.map((u) => (
          <div key={u.id} className="w-full md:w-[500px] mb-6 rounded">
            {/* Post Header */}
            <div className="flex items-center justify-between py-4 ">
              <div className="flex items-center gap-3">
                <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                  <div className="bg-black p-[2px] rounded-full">
                    <img src={u.profilePic || u.userAvatar} className="w-10 h-10 rounded-full" alt="user" />
                  </div>
                </div>

                {/* <span className="font-bold text-white">{followingUsers.find((u) => u.id === post.userId)?.username || "Unknown"}</span> */}
              </div>
              <Button onClick={() => setIsFollowModalOpen(true)} className="text-gray-400 hover:text-white">
                <ICONS.ellipsis />
              </Button>
            </div>

            {/* Post Image */}
            <div className="relative h-[400px] cursor-pointer border border-gray-800">
              <img src={u.imageUrl} alt={u.caption} className="w-full h-full object-cover rounded" />
            </div>
            <CommentLikesFooter post={u} openPostModal={() => openPostModal(u)} />
          </div>
        ))}

        <FollowUnFollowModal post={posts[0]} isOpen={isFollowModalOpen} onClose={() => setIsFollowModalOpen(false)} currentUserId={user?.uid} />
        {selectedPost && <PostDetails isOpen={isModalOpen} onClose={closePostModal} user={user} post={selectedPost} showDeleteButton={true} />}
      </section>
    </section>
  );
};

export default Home;
