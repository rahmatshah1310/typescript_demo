import React, { useEffect, useRef, useState } from "react";
import { Button, Modal, PostSkeleton } from "@components";
// import { useAuth } from "@/features/context/AuthContext";
// import { usePost } from "@/features/context/PostContext";
import { ICONS } from "@constants";
import { useAuthContext } from "@context";
import { useCommentOnPost } from "@api";
import { toast } from "react-toastify";

const CommentLikesFooter = ({ post, replyTo, setReplyTo }) => {
  const { user } = useAuthContext();
  const postComment = useCommentOnPost();
  const isLoading = postComment.isPending;
  // const { addLike, removeLike, addComment } = usePost();
  const inputRef = useRef();
  const [isLiked, setIsLiked] = useState(false);
  // const [likeCount, setLikeCount] = useState(0);
  // const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState("");
  // const [loadingComments, setLoadingComments] = useState(false);
  // const [loadingLikes, setLoadingLikes] = useState(false);

  // <---------------------------------------- Loading if Post is not Available ----------------------------------------->
  if (!post) {
    return <div className="text-white">No Post Available.</div>;
  }

  // <---------------------------------------- Fetch All The Comments ----------------------------------------->

  // <---------------------------------------- Add and Remove Links to the post ----------------------------------------->
  // const handleLike = async () => {
  //   if (isLiked) {
  //     await removeLike(post.id, user?.uid);
  //   } else {
  //     await addLike(post.id, user?.uid);
  //   }
  //   setIsLiked(!isLiked);
  // };

  const handleFocusInput = () => {
    inputRef.current.focus();
  };

  // <---------------------------------------- Add Comments ----------------------------------------->
  useEffect(() => {
    if (postComment.status === "success") {
      toast.success("Comment posted successfully");
      setCommentText("");
      setReplyTo("");
    } else if (postComment.status === "error") {
      toast.error(postComment.error?.message || "Failed to post comment");
    }
  }, [postComment.status, postComment.error, setReplyTo]);

  const handleComment = () => {
    if (!commentText.trim()) return;
    postComment.mutate({
      postId: post?.id,
      text: commentText.trim(),
      user,
    });
  };

  return (
    <div className="bg-black border-t border-gray-700 p-4">
      {/* Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button className={`text-gray-400 ${isLiked ? "text-red-500 hover:text-red-600" : ""}`}>
            {isLiked ? <ICONS.likeOutline /> : <ICONS.likeFilled />}
          </Button>
          <Button onClick={handleFocusInput} className="text-gray-400 hover:text-white">
            <ICONS.comment />
          </Button>
          <Button className="text-gray-400 hover:text-white">
            <ICONS.share />
          </Button>
        </div>
        <Button className="text-gray-400 hover:text-white">
          <ICONS.bookmark />
        </Button>
      </div>

      {/* Like count section - New */}
      {/* <div className="h-4 pl-1">
        {likeCount > 0 ? (
          <p className="font-semibold text-xs  text-white">
            {likeCount} {likeCount === 1 ? "like" : "likes"}
          </p>
        ) : (
          <p className="text-gray-400 text-xs">Be the first to like this</p>
        )}
      </div> */}

      {/* <---------------------------------------- Input for Adding Comments -----------------------------------------> */}
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add a comment..."
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="flex-1 text-white p-2 rounded-lg outline-none"
        />
        <Button className="text-blue-500 font-bold" onClick={handleComment} disabled={isLoading}>
          {isLoading ? "Posting..." : "Post"}
        </Button>
      </div>
    </div>
  );
};

export default CommentLikesFooter;
