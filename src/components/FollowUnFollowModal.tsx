import { useDeletePost, useFollowUserMutation, useUnfollowUserMutation } from "@api";
import { Button, Modal } from "@components";
import { useEffect, useState } from "react";
import { Post } from "@types";

const FollowUnFollowModal = ({ isOpen, onClose, post, currentUserId }) => {
  const followUser = useFollowUserMutation();
  const unfollowUser = useUnfollowUserMutation();
  const deletePost = useDeletePost();
  const [isFollowing, setIsFollowing] = useState(false);

  const handleOptionClick = async (post: Post, option) => {
    if (!post?.id && !currentUserId) return;

    switch (option.id) {
      case "delete":
        await deletePost.mutateAsync(post?.id);
        onClose();
        break;
      case "follow":
        await followUser.mutateAsync({ currentUserId, targetUserId: post.userId });
        setIsFollowing(true);
        onClose();
        break;
      case "unfollow":
        await unfollowUser.mutateAsync({ currentUserId, targetUserId: post.userId });
        setIsFollowing(false);
        onClose(); // Ensure modal closes
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (post?.userId && currentUserId && post?.followers) {
      setIsFollowing(post.followers.includes(currentUserId));
    }
  }, []);

  const options = [
    { id: "report", label: "Report", textColor: "text-red-500" },
    {
      id: isFollowing ? "unfollow" : "follow",
      label: isFollowing ? "Unfollow" : "Follow",
      textColor: "text-red-500",
    },
    { id: "addtofavorites", label: "Add to favorites" },
    { id: "goToPost", label: "Go to post" },
    { id: "shareTo", label: "Share to..." },
    { id: "copyLink", label: "Copy link" },
    { id: "embed", label: "Embed" },
    { id: "aboutAccount", label: "About this account" },
  ];

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-[85%] sm:w-[450px]" title={""}>
      <div className="bg-gray-800 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto py-2 overflow-hidden">
        <div className="flex flex-col">
          {options.map((option) => (
            <Button
              key={option.id}
              className={`py-4 px-4 text-center border-b border-gray-500 text-white ${option.textColor}`}
              onClick={() => handleOptionClick(post, option)}
            >
              {option.label}
            </Button>
          ))}
          <Button className="py-4 px-4 text-center text-white hover:bg-gray-700 transition-colors w-full" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FollowUnFollowModal;
