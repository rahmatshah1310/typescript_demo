import { useDeletePost } from "@api";
import { Button, Modal } from "@components";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function PostOptionsModal({ isOpen, onClose, post, showDelete }) {
  const deletePost = useDeletePost();

  useEffect(() => {
    if (deletePost.status === "success") {
      toast.success("Post deleted successfully");
      deletePost.reset();
      onClose();
    } else if (deletePost.status === "error") {
      toast.error(deletePost.error?.message || "Failed to delete post");
      deletePost.reset();
    }
  }, [deletePost.status, deletePost.error, onClose, deletePost]);

  const handleOptionClick = async (post, options) => {
    if (options.id === "delete") {
      await deletePost.mutateAsync(post.id);
      onClose();
    }
  };
  const options = [
    { id: "delete", label: "Delete", textColor: "text-red-500" },
    { id: "edit", label: "Edit" },
    { id: "hideCount", label: "Hide like count to others" },
    { id: "turnOffComments", label: "Turn off commenting" },
    { id: "goToPost", label: "Go to post" },
    { id: "shareTo", label: "Share to..." },
    { id: "copyLink", label: "Copy link" },
    { id: "embed", label: "Embed" },
    { id: "aboutAccount", label: "About this account" },
  ];

  const filteredOptions = showDelete ? options : options.filter((opt) => opt.id !== "delete");

  if (!isOpen) return null;

  return (
    <Modal title="" isOpen={isOpen} onClose={onClose} className="w-[85%] sm:w-[450px]">
      <div className="bg-gray-800 rounded-lg w-full py-2 overflow-hidden">
        <div className="flex flex-col">
          {filteredOptions.map((option) => (
            <Button
              key={option.id}
              disabled={deletePost.isPending}
              className="py-4 px-4 text-center border-b border-gray-500 text-white"
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
}
