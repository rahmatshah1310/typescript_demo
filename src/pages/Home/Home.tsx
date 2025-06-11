import React, { useState } from "react";
import { ICONS } from "@constants";
import { useAuth } from "@context";
import { HomeUsersSkeleton, PostSkeleton, Skeleton, Header, Button } from "@components";
import { useGetAllPosts } from "@api";
// import FollowUnFollowModal from "./components/FollowUnFollowModal";

const Home = () => {
  const { userData } = useAuth();
  const { data: posts, isLoading, error } = useGetAllPosts();
  console.log(posts)
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <section className="flex flex-col items-center gap-8 mt-10">
        <HomeUsersSkeleton />
        {[...Array(3)].map((_, idx) => (
          <PostSkeleton key={idx} />
        ))}
      </section>
    );
  }

  if (error || !posts || posts.length === 0) {
    return (
      <div className={error ? "text-red-500" : "text-white"}>
        {error ? "Failed to load posts." : "No posts Available."}
      </div>
    );
  }

  return (
    <section>
      <nav className="md:hidden">
        <Header />
      </nav>

      {/* Navbar section */}
      {/* <div className="flex items-center w-full space-x-4 overflow-x-auto p-4">
        {followingUsers.map((user) => (
          <div
            key={user.id}
            className="flex-none flex flex-col items-center space-y-1 min-w-[5.5rem]"
          >
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
              <div className="bg-black p-[2px] rounded-full">
                <img
                  src={user.profilePic}
                  alt={user.username}
                  className="w-20 h-20 aspect-square rounded-full object-cover"
                />
              </div>
            </div>
            <span className="text-white text-xs truncate max-w-[70px] text-center">
              {user.username}
            </span>
          </div>
        ))}
      </div> */}

      {/* Main section */}
      <section className="flex flex-col items-center justify-center">
        {posts.map((post, index) => (
          <div key={index} className="w-full md:w-[500px] mb-6 rounded">
            {/* Post Header */}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                  <div className="bg-black p-[2px] rounded-full">
                    {/* <img
                      src={
                        followingUsers.find((u) => u.id === post.userId)
                          ?.profilePic || "/fallback.jpg"
                      }
                      className="w-10 h-10 rounded-full"
                      alt="user"
                    /> */}
                    <img
                      src={userData.profilePic}
                      className="w-10 h-10 rounded-full"
                      alt="user"
                    />
                  </div>
                </div>
                {/* <span className="font-bold text-white">
                  {followingUsers.find((u) => u.id === post.userId)?.username ||
                    "Unknown"}
                </span> */}
              </div>
              <Button
                onClick={() => setIsOptionsModalOpen(true)}
                className="text-gray-400 hover:text-white"
              >
                {ICONS.threeDots}
              </Button>
            </div>

            {/* Post Image */}
            <div className="relative h-[400px] cursor-pointer border border-gray-800">
              <img
                src={post.imageUrls}
                alt={post.caption}
                className="w-full h-full object-cover rounded"
              />
            </div>

            {/* <CommentLikesFooter post={post} /> */}
          </div>
        ))}

        {/* <FollowUnFollowModal
          post={posts[0]}
          isOpen={isOptionsModalOpen}
          onClose={() => setIsOptionsModalOpen(false)}
        /> */}
      </section>
    </section>
  );
};

export default Home;
