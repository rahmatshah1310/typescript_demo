import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useEffect, useState } from "react";

const FollowUnFollowModal = ({ isOpen, onClose, post }) => {
  const [isFollowing, setIsFollowing] = useState(false);
//   const { user, followUser, unfollowUser } = useUser();

  const handleOptionClick = async (post, option) => {
    if (!post?.id) return;

    switch (option.id) {
      case "delete":
        await deletePost(post?.id);
        onClose();
        break;
      case "follow":
        await followUser(post.userId);
        setIsFollowing(true);
        onClose(); 
        break;
      case "unfollow":
        await unfollowUser(post.userId);
        setIsFollowing(false);
        onClose(); // Ensure modal closes
        break;
      default:
        break;
    }
  };

//   useEffect(() => {
//     if (post?.userId && user?.following) {
//       setIsFollowing(user.following.includes(post.userId));
//     }
//   }, [post?.userId, user?.following]);

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
    <Modal isOpen={isOpen} onClose={onClose}>
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
          <Button
            className="py-4 px-4 text-center text-white hover:bg-gray-700 transition-colors w-full"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FollowUnFollowModal;
