import React, { useEffect, useRef, useState } from "react";
import { ICONS } from "@constants";
import {Modal,Button,Skeleton,PostSkeleton} from "@components";
import { useAuth } from "@context";
import type { Post } from "../../types/profile";

interface CommentLikesFooterProps {
  post: Post[]; 
  replyTo: string | null;
  setReplyTo: (value: string | null) => void;
}

const CommentLikesFooter: React.FC<CommentLikesFooterProps> = ({ post, replyTo, setReplyTo }) => {
  const { userData } = useAuth();
  const inputRef = useRef();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
//   const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState("");
//   const [loadingComments, setLoadingComments] = useState(false);
//   const [loadingLikes, setLoadingLikes] = useState(false);

  // <---------------------------------------- Loading if Post is not Available ----------------------------------------->
  if (!post) {
    return <div className="text-white">No Post Available.</div>;
  }

  return (
    <div className="bg-black border-t border-gray-700 p-4">
      {/* Actions */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Button
            // onClick={handleLike}
            className={`text-gray-400 ${
              isLiked ? "text-red-500 hover:text-red-600" : ""
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
        //   onClick={handleComment}
          disabled={!commentText.trim()}
        >
          Post
        </Button>
      </div>
    </div>
  );
};

export default CommentLikesFooter;
