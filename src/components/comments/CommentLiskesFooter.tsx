import React, { useEffect, useRef, useState } from "react";
import { ICONS } from "@constants";
import { Modal, Button, Skeleton, PostSkeleton } from "@components";
import { useAuth } from "@context";
import { useCreateCommentMutation } from "@api";
import { toast } from "react-toastify";
import { useLikeMutation } from "@api";
import { useDislikeMutation } from "../../api";

interface CommentLikesFooterProps {
  post: [];
  replyTo: string | null;
  setReplyTo: (value: string | null) => void;
  postId:string;

}

const CommentLikesFooter: React.FC<CommentLikesFooterProps> = ({ post, postId, replyTo, setReplyTo }) => {
  const { userData } = useAuth();
  const inputRef = useRef<unknown>();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentText, setCommentText] = useState("");
  const commentMutation = useCreateCommentMutation();
 const likeMutation = useLikeMutation();
const dislikeMutation = useDislikeMutation();


const handleLike=()=>{
  if(!postId) return;
  if(isLiked){
    dislikeMutation.mutate(postId,{
      onSuccess:()=>{
        setIsLiked(false);
        setLikeCount((prev)=>prev-1);
      }
    })
  }else{
    likeMutation.mutate(postId,{
      onSuccess:()=>{
        setIsLiked(false);
        setLikeCount((prev)=>prev+1);
      }
    })
  }
}

 const handleComment = () => {
  if (!postId || !commentText.trim()) {
    toast.error("Missing post ID or comment text");
    return;
  }

  const payload={
    comment:commentText.trim(),
  }

  commentMutation.mutate({ postId, payload });
  setCommentText(""); // clear input after submit
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
            onClick={handleLike}
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
