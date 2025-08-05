import { Button, Modal } from "@components";

const CommentModal = ({ isOpen, onClose, onDelete, deleteCommentMutation }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-[#262626] p-4 rounded-md text-white w-96  flex flex-col space-y-4">
        <Button className="text-red-500" onClick={onDelete} disabled={deleteCommentMutation}>
          {deleteCommentMutation ? "Delete..." : "Delete"}
        </Button>
        <Button className="text-gray-300" onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default CommentModal;
