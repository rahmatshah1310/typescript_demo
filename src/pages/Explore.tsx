import React, { useState } from "react";
// import { UserPosts } from "@hooks/UserPosts";
import { useAuthContext } from "@context";
import { Skeleton, PostDetails } from "@components";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES, ICONS } from "@constants";
import { usePosts } from "@api";

const Explore = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuthContext();

  const { data: posts, isLoading: loading, error } = usePosts(user.id);

  // if (!posts) {
  //   return <div className="text-white">Loading kai sabar waka.......</div>;
  // }

  /* <------------------------------- Implementing Route for PostDetails with id -------------------------------> */
  const navigate = useNavigate();
  const location = useLocation();
  const openPostModal = (posts) => {
    setSelectedPost(posts);
    navigate(`/${posts.id}`, {
      state: { backgroundLocation: location },
    });
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <section className="grid grid-cols-5 gap-4 mt-8">
        <div />
        <div className="col-span-3 grid grid-cols-3 gap-4">
          {[...Array(9)]?.map((_, idx) => (
            <Skeleton key={idx} className="h-[250px] bg-gray-800  w-full" />
          ))}
        </div>

        <div />
      </section>
    );
  }

  if (error) return <p>Error: {error}</p>;

  const closePostModal = () => {
    setSelectedPost(null);
    // setIsModalOpen(false);
    // navigate(ROUTES.explore);
  };

  return (
    <>
      <section className="grid grid-cols-1 gap-0 xl:grid-cols-5 xl:gap-4 mt-0 xl:mt-8">
        <div />
        <div className="col-span-1 xl:col-span-3 grid grid-cols-3 gap-[6px] xl:gap-2">
          {posts?.map((post) => (
            <div key={post.id} className="relative group cursor-pointer aspect-square" onClick={() => openPostModal(post)}>
              <img src={post?.imageUrl} alt={post?.caption} className="w-full h-full object-cover" />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-white font-semibold flex items-center gap-6">
                  <span className="flex">
                    <ICONS.likeFilled />
                    {post?.likes?.length || 0}
                  </span>
                  <span className="flex">
                    <ICONS.comment /> {post?.commentCount || 0}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedPost && <PostDetails isOpen={isModalOpen} onClose={closePostModal} post={selectedPost} user={user} showDeleteButton={false} />}
    </>
  );
};

export default Explore;
