import React, { useEffect, useState } from "react";
import { ICONS } from "@/constants/icons";
import { Button, Modal, Skeleton, CommentSkeleton, HomeUsersSkeleton, PostSkeleton, CommentLikesFooter, Header, PostOptionsModal } from "@components";

// import { UserPosts } from "@/hooks/UserPosts";
import { useAuthContext } from "@context";
import { usePosts } from "@api";
// import FollowUnFollowModal from "./components/FollowUnFollowModal";
// import { useHomeFeedPosts } from "@/hooks/useHomeFeetPosts";
// import ShadcnPopover from "@/components/common/ShadcnPopover";

const Home = () => {
  const { user } = useAuthContext();
  // const { followingUsers, posts, loading } = useHomeFeedPosts(user?.uid);
  const { data: posts, isLoading: loading } = usePosts();
  const [comments, setComments] = useState({});
  const [likes, setLikes] = useState({});
  const [likeCounts, setLikeCounts] = useState({});
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);

  // Real-time comments listener
  // useEffect(() => {
  //   if (!posts) return;

  //   const unsubscribes = posts.map((post) =>
  //     onSnapshot(collection(firestore, "posts", post.id, "comments"), (snapshot) => {
  //       setComments((prev) => ({
  //         ...prev,
  //         [post.id]: snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         })),
  //       }));
  //     })
  //   );

  //   return () => {
  //     unsubscribes.forEach((unsub) => unsub());
  //   };
  // }, [posts]);

  // Real-time likes listener for each post
  // useEffect(() => {
  //   if (!posts || !user?.uid) return;

  //   const unsubscribes = posts.map((post) => {
  //     const postRef = doc(firestore, "posts", post.id);
  //     return onSnapshot(postRef, (doc) => {
  //       if (doc.exists()) {
  //         const postData = doc.data();
  //         setLikes((prev) => ({
  //           ...prev,
  //           [post.id]: postData.likes?.includes(user.uid) || false,
  //         }));
  //         setLikeCounts((prev) => ({
  //           ...prev,
  //           [post.id]: postData.likes?.length || 0,
  //         }));
  //       }
  //     });
  //   });

  //   return () => {
  //     unsubscribes.forEach((unsub) => unsub());
  //   };
  // }, [posts, user?.uid]);

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
    return <div className="text-white">No posts Available.</div>;
  }

  return (
    <section>
      <nav className="md:hidden">
        <Header />
      </nav>
      {/* Navbar section */}
      {/* <div className="flex items-center w-full space-x-4 overflow-x-auto p-4">
        {followingUsers.map((user) => (
          <div key={user.id} className="flex-none flex flex-col items-center space-y-1 min-w-[5.5rem]">
            <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
              <div className="bg-black p-[2px] rounded-full">
                <img src={user.profilePic || "/fallback.jpg"} alt={user.username} className="w-20 h-20 aspect-square rounded-full object-cover" />
              </div>
            </div>
            <span className="text-white text-xs truncate max-w-[70px] text-center">{user.username}</span>
          </div>
        ))}
      </div> */}

      {/* Main section */}
      <section className="flex flex-col items-center justify-center ">
        {posts.map((post) => (
          <div key={post.id} className="w-full md:w-[500px] mb-6 rounded">
            {/* Post Header */}
            <div className="flex items-center justify-between py-4 ">
              <div className="flex items-center gap-3">
                <div className="p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                  <div className="bg-black p-[2px] rounded-full">
                    {/* <img src={followingUsers.find((u) => u.id === post.userId)?.profilePic || ""} className="w-10 h-10 rounded-full" alt="user" /> */}
                  </div>
                </div>

                {/* <span className="font-bold text-white">{followingUsers.find((u) => u.id === post.userId)?.username || "Unknown"}</span> */}
              </div>
              <Button onClick={() => setIsOptionsModalOpen(true)} className="text-gray-400 hover:text-white">
                <ICONS.ellipsis />
              </Button>
            </div>

            {/* Post Image */}
            <div className="relative h-[400px] cursor-pointer border border-gray-800">
              <img src={post.imageUrl} alt={post.caption} className="w-full h-full object-cover rounded" />
            </div>

            <CommentLikesFooter post={post} />
          </div>
        ))}

        {/* <FollowUnFollowModal post={posts[0]} isOpen={isOptionsModalOpen} onClose={() => setIsOptionsModalOpen(false)} /> */}
        <PostOptionsModal
          post={posts}
          isOpen={isOptionsModalOpen}
          // onDelete={handleDeleteComment}
          onClose={() => setIsOptionsModalOpen(false)}
          showDelete={true}
        />
      </section>
    </section>
  );
};

export default Home;
