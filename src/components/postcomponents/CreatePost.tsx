import { PostComponent, Modal } from "@components";

const CreatePost = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal
        title=""
        isOpen={isOpen}
        onClose={onClose} // handles outside click
        className="w-[90%] sm:w-[500px] md:w-[600px] lg:w-[700px] xl:w-[800px] 2xl:w-[700px] "
      >
        <PostComponent isOpen={isOpen} onClose={onClose} />
      </Modal>
    </>
  );
};

export default CreatePost;
