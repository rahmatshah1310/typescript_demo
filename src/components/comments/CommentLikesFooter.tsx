import React, { useEffect, useRef, useState } from "react";
import { Button } from "@components";
import { ICONS } from "@constants";
import { useAuthContext } from "@context";
import { useCommentOnPost, useDislikePostMutation, useLikePostMutation } from "@api";
import { toast } from "react-toastify";

const CommentLikesFooter = ({ post, replyTo, setReplyTo }) => {
  const { user } = useAuthContext();
  const postComment = useCommentOnPost();
  const likeMutation = useLikePostMutation();
  const dislikeMutation = useDislikePostMutation();
  const isLoading = postComment.isPending;
  const inputRef = useRef<HTMLInputElement>(null);

  // Use server state instead of local state
  const [isLiked, setIsLiked] = useState(false);
  const [commentText, setCommentText] = useState("");

  // Sync with server state when post changes
  useEffect(() => {
    if (post && user) {
      // Check if user has liked the post
      const likedBy = post.likedBy || [];
      setIsLiked(likedBy.includes(user.uid));
    }
  }, [post, user]);

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  // <---------------------------------------- Add Comments ----------------------------------------->
  useEffect(() => {
    if (postComment.status === "success") {
      toast.success("Comment posted successfully");
      setCommentText("");
      setReplyTo(""); // Clear reply to when comment is posted
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

  const handleLike = () => {
    if (!post?.id || !user?.uid) return;

    if (!isLiked) {
      likeMutation.mutate({ postId: post.id, userId: user.uid });
    } else {
      dislikeMutation.mutate({ postId: post.id, userId: user.uid });
    }
  };

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
            onClick={handleLike}
            className={`text-gray-400 ${isLiked ? "text-red-500 hover:text-red-600" : ""}`}
            disabled={likeMutation.isPending || dislikeMutation.isPending}
          >
            {isLiked ? <ICONS.likeFilled /> : <ICONS.likeOutline />}
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

      {/* Like count section - Use server state */}
      <div className="h-4 pl-1">
        {post.likeCount > 0 ? (
          <p className="font-semibold text-xs text-white">
            {post.likeCount} {post.likeCount === 1 ? "like" : "likes"}
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
          placeholder={replyTo ? `Reply to ${replyTo}...` : "Add a comment..."}
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
