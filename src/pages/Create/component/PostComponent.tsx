import React, { useRef, useState, useEffect } from "react";
import { InputField, Button, Modal } from "@components";
import { ICONS } from "@constants";
import { Spinner } from "@components";
import { usePostMutation } from "@api";
import { toast } from "react-toastify";

interface PostProps {
  isOpen?: boolean;
  onClose?: () => void;
}
const PostComponent: React.FC<PostProps> = ({ isOpen, onClose }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCancelContainer, setShowCancelContainer] = useState<boolean | null>(false);

  //mutation function for post
  const postMutation = usePostMutation();
;
  useEffect(() => {
    if (postMutation.status === "success") {
      toast.success(postMutation.data?.message || "Post uploaded successfully!");
    } else if (postMutation.status === "error") {
      const errorMessage = postMutation.error as any;
      toast.error(`Failed to create post!\n${errorMessage?.message || "Unknown error"}`);
    }
  }, [postMutation.status]);



  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file && file.type.startsWith("image/")) {

      setSelectedFile(file);
    } else {
      console.error("Invalid file type.");
    }
  };

  const openFilePicker = () => {
    fileInputRef.current.click();
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append("images", selectedFile);
      postMutation.mutate(formData);
    }
  };


  const toggleCancelContainer = () => {
    setShowCancelContainer(!showCancelContainer);
  };

  return (
    <section className="w-full h-auto m-0">
      {/* <---------------------------------------- Modal For Discard and Cancel -----------------------------------------> */}
      <Modal
        isOpen={showCancelContainer}
        className="bg-[#262626]"
        onClose={() => setShowCancelContainer(false)}
      >
        <div className="flex flex-col items-center justify-center space-y-2 p-6 rounded-lg shadow-md">
          <h2 className="text-white">Discard post? </h2>
          <p className="text-[#A8A8A8]">
            If you leave, your edits won't be saved.
          </p>
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

            <Button
              onClick={() => setShowCancelContainer(false)}
              className="bg-gray-300 text-black px-4 py-2 rounded"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>

      <h2 className="text-xl font-bold mb-4 text-white text-center">
        Create a Post
      </h2>

      {/* <---------------------------------------- Adding Back and Next Button -----------------------------------------> */}
      {selectedFile && (
        <div className="flex justify-between mt-4 py-2">
          <Button
            onClick={toggleCancelContainer}
            className="text-white text-3xl"
          >
            {ICONS.backArrow}
          </Button>
          <Button onClick={handleUpload} className="text-blue-500">
            {postMutation.isLoading ? <Spinner type="beat" color="blue" /> : "Next"}
          </Button>
        </div>
      )}

      {/* <---------------------------------------- Drag and Drop Area For Image -----------------------------------------> */}
      <div className="w-full sm:w-[90%] md:w-full mx-auto h-[300px] sm:h-[500px] md:h-[700px] bg-[#262626] flex flex-col justify-center relative p-2">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith("image/")) {
              setSelectedFile(file);
            } else {
              console.error("Invalid file type.");
            }
          }}
          className={`relative p-6 text-center h-[700px] flex items-center justify-center `}
        >
          {previewUrl ? (
            <img
              src={previewUrl}
              alt="Preview"
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          ) : (
            <div className="flex flex-col items-center space-y-1.5">
              <span className="text-gra-700">{ICONS.photoVideo}</span>
              <p className="text-gray-500">Drag Photos and Videos here</p>
              {!selectedFile && (
                <Button
                  onClick={openFilePicker}
                  disabled={postMutation.isLoading}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600  mx-auto"
                >
                  Upload Post
                </Button>
              )}
            </div>
          )}
        </div>

        {/* <---------------------------------------- Input for selcting file -----------------------------------------> */}
        <InputField
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
          inputClassname="hidden"
        />
      </div>
    </section>
  );
};

export default PostComponent;
