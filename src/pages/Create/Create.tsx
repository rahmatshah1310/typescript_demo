import PostComponent from "./component/PostComponent";
import {Modal,Button} from "@components";
import { useState } from "react";

const CreatePost = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        title="Create Post"
        onClose={onClose} // handles outside click
      >
        <PostComponent isOpen={isOpen} onClose={onClose} />
      </Modal>
    </>
  );
};

export default CreatePost;
