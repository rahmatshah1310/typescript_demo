import React, { useEffect, useRef, useState } from "react";
import { ICONS } from "@constants";
import { Modal, Button, Skeleton, PostSkeleton } from "@components";
import { useAuth } from "@context";
import { useCreateCommentMutation } from "@api";
import { toast } from "react-toastify";
import { useGetAllComments } from "../../api";

interface CommentLikesFooterProps {
  post: Post[];
  replyTo: string | null;
  setReplyTo: (value: string | null) => void;
}

const CommentLikesFooter: React.FC<CommentLikesFooterProps> = ({ post, postId, replyTo, setReplyTo }) => {
  const { userData } = useAuth();
  const inputRef = useRef();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  //   const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState("");
  //   const [loadingComments, setLoadingComments] = useState(false);
  //   const [loadingLikes, setLoadingLikes] = useState(false);
  const commentMutation = useCreateCommentMutation();
  const { data:comments , error, isSuccess, isError } = useGetAllComments(postId);
console.log(comments,"this is all comments")

  const handleComment = () => {
    if (!postId || !commentText.trim()) {
      toast.error("Missing post ID, or comment text");
      return;
    }
    const formData = new FormData();
    formData.append("comment", commentText)
    commentMutation.mutate(
      {
        postId, formData
      },
    );
  };

  // <---------------------------------------- Loading if xPost is not Available ----------------------------------------->
  useEffect(() => {
    if (commentMutation.status === "success") {
      toast.success(commentMutation.data?.message || "Comment Added successfully!");
    } else if (commentMutation.status === "error") {
      const errorMessage = commentMutation.error as any;
      toast.error(`Failed to create comment!\n${errorMessage?.message || "Unknown error"}`);
    }
  }, [commentMutation.status, commentMutation]);


  return (
    <div className="bg-black border-t border-gray-700 p-4">
      {/* Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button
            // onClick={handleLike}
            className={`text-gray-400 ${isLiked ? "text-red-500 hover:text-red-600" : ""
              }`}
          >
            {isLiked ? ICONS.heartFilled : ICONS.ciHeart}
          </Button>
          <Button
            // onClick={handleFocusInput}
            className="text-gray-400 hover:text-white"
          >
            {ICONS.commentIcon}
          </Button>
          <Button className="text-gray-400 hover:text-white">
            {ICONS.shareIcon}
          </Button>
        </div>
        <Button className="text-gray-400 hover:text-white">
          {ICONS.bookMark}
        </Button>
      </div>

      <div className="h-4 pl-1">
        {likeCount > 0 ? (
          <p className="font-semibold text-xs  text-white">
            {likeCount} {likeCount === 1 ? "like" : "likes"}
          </p>
        ) : (
          <p className="text-gray-400 text-xs">Be the first to like this</p>
        )}
      </div>

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
        <Button
          className="text-blue-500 font-bold"
          onClick={handleComment}
          disabled={!commentText.trim()}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CommentLikesFooter;
