import PostComponent from "./component/PostComponent";
import {Modal} from "@components";


interface CreatePostProps{
  isOpen?:boolean;
  onClose?:()=>void;
}
const CreatePost:React.FC<CreatePostProps> = ({ isOpen, onClose }) => {
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
