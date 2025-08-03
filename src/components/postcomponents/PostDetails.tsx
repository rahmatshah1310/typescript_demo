import React, { useEffect, useState } from "react";
import { ICONS } from "@constants";
import { Button, Modal, Spinner, PostHeader, PostOptionsModal, CommentModal, CommentLikesFooter } from "@components";
// import { usePost } from "@/features/context/PostContext";
// import PostOptionsModal from "@pages/Profile/components/PostOptionsModal";
import { getShortTimeAgo } from "@utils";
import { useComments, useGetPostById } from "@api";
// import CommentLikesFooter from "@/components/comments/CommentLiskesFooter";
// import PostHeader from "@/components/header/PostHeader";

type PostDetailsProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  showDeleteButton: boolean;
  post: Post | null;
};

const PostDetails: React.FC<PostDetailsProps> = ({ isOpen, onClose, post }) => {
  // const { deleteComment, addLikeForComment, removeLikeForComment } = usePost();
  // const [comment, setComment] = useState([]);
  // const [loadingComments, setLoadingComments] = useState(false);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const { data: singlePost, isLoading: loadingPost } = useGetPostById(post?.id);
  const { data: comments, isLoading: loadingComments } = useComments(post?.id);
  console.log(comments,"commnts..............")
  // const [selectedCommentId, setSelectedCommentId] = useState(null);
  const [replyTo, setReplyTo] = useState("");

  const handleReply = (username) => {
    setReplyTo(`@${username}`);
  };

  if (!PostDetails) {
    return <div className="text-white">No Post Available.</div>;
  }

  return (
    // <Modal isOpen={isOpen} onClose={onClose} className="w-[70%] bg-white">
    //   <section className="flex flex-col bg-black md:flex-row w-[100%] mx-auto max-w-[400px] md:max-w-[1500px] overflow-hidden border border-white">
    //     <PostHeader onOptionClick={() => setIsOptionsModalOpen(true)} className="flex md:hidden items-center justify-between p-2" />
    //     {/* Image section */}
    //     <div className="w-full md:w-[1500px] aspect-square md:aspect-auto h-[200px] sm:h-[300px] md:h-[850px] bg-[#262626] flex items-center justify-center">
    //       {loadingPost ? <Spinner type="beat" /> : <img src={singlePost?.imageUrl} alt="Post" className="object-cover w-full h-full" />}
    //     </div>
    //     {/* Right side: actions/comments */}
    //     <div className="w-full md:w-3/3 flex flex-col bg-black min-h-[200px] max-h-[30vh] md:min-h-[400px] md:max-h-[600px] p-2">
    //       <PostHeader onOptionClick={() => setIsOptionsModalOpen(true)} className="hidden md:flex items-center justify-between p-4" />
    //       {/* Comments */}
    //       <div className="hidden md:flex md:flex-col md:min-h-[650px] md:max-h-[200px] overflow-y-auto px-4 p-2 border-t border-gray-700 pt-4">
    //         {loadingComments ? (
    //           // <>
    //           //   {[...Array(3)].map((_, idx) => (
    //           //     <CommentSkeleton key={idx} />
    //           //   ))}
    //           // </>
    //         ) : comments.length === 0 ? (
    //           <div className="text-gray-400 text-center py-4 h-screen flex flex-col items-center justify-center">
    //             <span className="text-2xl"> No comments yet.</span>
    //             <p> Start the conversation!</p>
    //           </div>
    //         ) : (
    //           comments.map((c) => (
    //             <div key={c.id} className="flex items-start justify-between gap-3 mb-2">
    //               <div className="flex items-start gap-4">
    //                 <img src={c.profilePic} alt="profilePic" className="w-8 h-8 rounded-full object-cover" />
    //                 <div>
    //                   <span className="font-semibold text-white text-sm pr-4">{c.username}</span>
    //                   <span className="text-white text-sm">{c.text}</span>
    //                   <div className="text-xs text-gray-400 flex items-center gap-2">
    //                     {getShortTimeAgo(c.createdAt)}
    //                     <span className="text-xs text-gray-400">{c.likeCount || 0} Like</span>
    //                     <Button className="text-xs text-gray-400" onClick={() => handleReply(c.username)}>
    //                       Reply
    //                     </Button>
    //                     <Button className="text-xs text-gray-400" onClick={() => confirmDeleteComment(c.id)}>
    //                       <ICONS.ellipsis/>
    //                     </Button>
    //                   </div>
    //                 </div>
    //               </div>
    //               {/* <Button
    //                 className="text-xs text-gray-400"
    //                 onClick={() =>
    //                   c.likedBy && c.likedBy.includes(user.uid) ? removeLikeForComment(post.id, c.id, user.uid) : addLikeForComment(post.id, c.id, user.uid)
    //                 }
    //               >
    //                 {c.likedBy && c.likedBy.includes(user.uid) ? ICONS.heartFilled : ICONS.ciHeart}
    //               </Button> */}
    //             </div>
    //           ))
    //         )}
    //       </div>
    //       <CommentLikesFooter post={post} replyTo={replyTo} setReplyTo={setReplyTo} />
    //     </div>
    //   </section>
    //   {/* Modals */}
    //   <CommentModal isOpen={isCommentModalOpen} onClose={() => setIsCommentModalOpen(false)} />
    //   <PostOptionsModal
    //     post={post}
    //     isOpen={isOptionsModalOpen}
    //     // onDelete={handleDeleteComment}
    //     onClose={() => setIsOptionsModalOpen(false)}
    //     showDelete={true}
    //   />
    // </Modal>
  );
};

export default PostDetails;
