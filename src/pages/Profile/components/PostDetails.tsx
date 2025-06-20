import React, { useEffect, useState } from "react";
import { ICONS } from "@constants";
import {Button,Modal,CommentModal,CommentSkeleton,CommentLikesFooter} from "@components";
import PostOptionsModal from "./PostOptionsModal";
import { getShortTimeAgo } from "@utils";
import { useGetSinglePost } from "@api";
import { toast } from "react-toastify";
import { useGetAllComments } from "../../../api";
// import PostHeader from "@/components/header/PostHeader";


interface postDetailsProps{
  isOpen:boolean;
  onClsoe:()=>void;
  user:{
    userName:string;
    imageUrls:string;
  }
  showDeleteButton?:boolean;
  postId:string;
}

const PostDetails:React.FC<postDetailsProps> = ({ isOpen, onClose, user, showDeleteButton,postId }) => {
  const [comment, setComment] = useState([]);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);
  const { data:comments ,isLoading:loadingComments} = useGetAllComments(postId);
  const [replyTo, setReplyTo] = useState("");
  console.log(comments,"comments in postdetails")
 const {
  data: post,
  isSuccess,isError,error,isPending
} = useGetSinglePost(postId);
   useEffect(() => {
  if (isSuccess) {
    toast.success(post?.message);
  } else if (isError) {
    toast.error(`Failed to get single post!\n${(error as any)?.message || "Unknown error"}`);
  }
}, [isSuccess, isError, error])


  const handleReply = (userName) => {
    setReplyTo(`@${userName}`);
  };
  // if (!post) {
  //   return <div className="text-white">No Post Available.</div>;
  // }

if(isPending){
  <div>Loading...</div>
}

//   useEffect(() => {
//     if (!post?.id) return;
//     setLoadingComments(true);
//     const unsubscribe = onSnapshot(
//       collection(firestore, "posts", post.id, "comments"),
//       (snapshot) => {
//         setComment(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
//         setLoadingComments(false);
//       }
//     );
//     return () => unsubscribe();
//   }, [post?.id]);

//   const confirmDeleteComment = (id) => {
//     setSelectedCommentId(id);
//     setIsCommentModalOpen(true);
//   };
//   const handleDeleteComment = async () => {
//     try {
//       if (!post?.id || !selectedCommentId) return;
//       await deleteComment(post?.id, selectedCommentId);
//       setComment((prev) => prev.filter((c) => c.id !== selectedCommentId));
//       setIsCommentModalOpen(false);
//     } catch (error) {
//       console.error("Error deleting comment:", error);
//     }
//   };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <section className="flex flex-col bg-black md:flex-row w-[90%] mx-auto max-w-[400px] md:max-w-[1500px] overflow-hidden">
        {/* <PostHeader
          user={user}
          onOptionClick={() => setIsOptionsModalOpen(true)}
          className="flex md:hidden items-center justify-between p-4"
        /> */}
        {/* Image section */}
        <div className="w-full md:w-[900px] aspect-square md:aspect-auto h-[200px] sm:h-[300px] md:h-[850px] bg-[#262626] flex items-center justify-center">
          <img
            src={post?.post?.imageUrls}
            alt="Post"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Right side: actions/comments */}
        <div className="w-full md:w-1/2 flex flex-col bg-black min-h-[200px] max-h-[30vh] md:min-h-[400px] md:max-h-[600px]">
          {/* <PostHeader
            user={user}
            onOptionClick={() => setIsOptionsModalOpen(true)}
            className="hidden md:flex items-center justify-between p-4"
          /> */}
          {/* Comments */}
         <div className="hidden md:flex md:flex-col md:min-h-[650px] md:max-h-[200px] overflow-y-auto px-4 p-2 border-t border-gray-700 pt-4">
            {loadingComments ? (
              <>
                {[...Array(3)].map((_, idx) => (
                  <CommentSkeleton key={idx} />
                ))}
              </>
            ) : !comment ? (
              <div className="text-gray-400 text-center py-4 h-screen flex flex-col items-center justify-center">
                <h1 className="text-2xl"> No comments yet.</h1>
                <p> Start the conversation!</p>
              </div>
            ) : (
              comments?.data?.comments.map((c) => (
                <div
                  key={c.id}
                  className="flex items-start justify-between gap-3 mb-2"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={c.user?.profilePic}
                      alt="profilePic"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <span className="font-semibold text-white text-sm pr-4">
                        {c.user?.userName}
                      </span>
                      <span className="text-white text-sm">{c.comment}</span>
                      <div className="text-xs text-gray-400 flex items-center gap-2">
                        {getShortTimeAgo(c.createdAt)}
                        <span className="text-xs text-gray-400">
                          {c.likeCount || 0} Like
                        </span>
                        <Button
                          className="text-xs text-gray-400"
                          onClick={() => handleReply(c.user?.userName)}
                        >
                          Reply
                        </Button>
                        <Button
                          className="text-xs text-gray-400"
                          onClick={() => confirmDeleteComment(c.id)}
                        >
                          {ICONS.threeDots}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="text-xs text-gray-400"
                    onClick={() =>
                      c.likedBy && c.likedBy.includes(user.uid)
                        ? removeLikeForComment(post.id, c.id, user.uid)
                        : addLikeForComment(post.id, c.id, user.uid)
                    }
                  >
                    {c.likedBy && c.likedBy.includes(user.uid)
                      ? ICONS.heartFilled
                      : ICONS.ciHeart}
                  </Button>
                </div>
              ))
            )}
          </div> 
          <CommentLikesFooter
            post={post}
            replyTo={replyTo}
            postId={postId}
            setReplyTo={setReplyTo}
          />
        </div>
      </section>
      {/* Modals */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        // onDelete={handleDeleteComment}
      />
      <PostOptionsModal
        post={post}
        isOpen={isOptionsModalOpen}
        // onDelete={handleDeleteComment}
        onClose={() => setIsOptionsModalOpen(false)}
        showDelete={showDeleteButton}
      />
    </Modal>
  );
};

export default PostDetails;
