import { useState } from "react";
import {Modal,Button} from "@components";
import { useDeletePostMutation } from "@api";

export default function PostOptionsModal({
  isOpen,
  onClose,
  postId,
  showDelete,
}) {

  const deletePost=useDeletePostMutation();

  const handleOptionClick = async (postId, options) => {
    if (!postId) return;
    if (options.id === "delete") {
      deletePost.mutate(postId);
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

  const filteredOptions = showDelete
    ? options
    : options.filter((opt) => opt.id !== "delete");

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-gray-800 rounded-lg w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto  py-2 overflow-hidden">
        <div className="flex flex-col">
          {filteredOptions.map((option, index) => (
            <Button
              key={option.id}
              className={`py-4 px-4 text-center border-b border-gray-500 text-white`}
              onClick={() => handleOptionClick(postId, option)}
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
}
