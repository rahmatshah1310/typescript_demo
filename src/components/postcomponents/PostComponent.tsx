import { useRef, useState, useEffect } from "react";
// import { usePost } from "@features/context/PostContext";
import { ICONS } from "@constants";
import { Spinner, Button, Modal, InputField } from "@components";
import { useCreatePost, useUploadPostImage } from "@api";
import { toast } from "react-toastify";
import { useAuthContext } from "@context";

const PostComponent = ({ isOpen, onClose }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showCancelContainer, setShowCancelContainer] = useState(false);
  const { user } = useAuthContext();
  const createPost = useCreatePost();
  const uploadPostImage = useUploadPostImage();
  const loading = createPost.isPending;

  // const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
    } else {
      console.error("Invalid file type.");
    }
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    if (createPost.status === "success") {
      toast.success("Post created successfully");
      setSelectedFile(null);
      setPreviewUrl(null);
      onClose();
    } else if (createPost.status === "error") {
      toast.error(createPost.error?.message || "Failed to create post");
    }
  }, [createPost.status, createPost.error, onClose]);

  const handleUpload = async () => {
    if (!selectedFile) return;
    const imageUrl = await uploadPostImage.mutateAsync(selectedFile);
    if (!imageUrl) {
      throw new Error("Image upload did not return a URL.");
    }

    const postData = {
      caption: "My first post!",
      imageUrl,
      userId: user?.uid,
      username: user?.username,
      profilePic: user?.profilePic,
    };
    createPost.mutate(postData);
  };

  const toggleCancelContainer = () => {
    setShowCancelContainer(!showCancelContainer);
  };

  return (
    <section className="w-full h-auto m-0">
      {/* <---------------------------------------- Modal For Discard and Cancel -----------------------------------------> */}
      <Modal isOpen={showCancelContainer} className="bg-[#262626]" onClose={() => setShowCancelContainer(false)}>
        <div className="flex flex-col items-center justify-center space-y-2 p-6 rounded-lg shadow-md">
          <h2 className="text-white">Discard post? </h2>
          <p className="text-[#A8A8A8]">If you leave, your edits won't be saved.</p>
          <div className="flex justify-center space-x-4 ">
            <Button
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
                setShowCancelContainer(false);
              }}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Discard
            </Button>

            <Button onClick={() => setShowCancelContainer(false)} className="bg-gray-300 text-black px-4 py-2 rounded">
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <h2 className="text-xl font-bold mb-4 text-white text-center">Create a Post</h2>

      {/* <---------------------------------------- Adding Back and Next Button -----------------------------------------> */}
      {selectedFile && (
        <div className="flex justify-between mt-4 py-2">
          <Button onClick={toggleCancelContainer} className="text-white text-3xl">
            <ICONS.back />
          </Button>
          <Button onClick={handleUpload} className="text-blue-500" disabled={loading}>
            {loading ? <Spinner type="beat" color="blue" /> : "Next"}
          </Button>
        </div>
      )}

      {/* <---------------------------------------- Drag and Drop Area For Image -----------------------------------------> */}
      <div className="w-full sm:w-[90%] md:w-[700px] mx-auto h-[300px] sm:h-[500px] md:h-[700px] bg-[#262626] flex flex-col justify-center relative">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith("image/")) {
              setSelectedFile(file);
              setIsPending(true);
            } else {
              console.error("Invalid file type.");
            }
          }}
          className={`relative p-6 text-center h-[700px] flex items-center justify-center `}
        >
          {previewUrl ? (
            <img src={previewUrl} alt="Preview" className="absolute top-0 left-0 w-full h-full object-cover" />
          ) : (
            <div className="flex flex-col items-center space-y-1.5">
              {/* <span className="text-gra-700">{ICONS.photoVideo}</span> */}
              <p className="text-gray-500">Drag Photos and Videos here</p>
              {!selectedFile && (
                <Button onClick={openFilePicker} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600  mx-auto">
                  Upload Post
                </Button>
              )}
            </div>
          )}
        </div>

        {/* <---------------------------------------- Input for selcting file -----------------------------------------> */}
        <InputField type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" label="" />
        {/* {error && <p className="text-red-500 mt-2">{error}</p>} */}
      </div>
    </section>
  );
};

export default PostComponent;
