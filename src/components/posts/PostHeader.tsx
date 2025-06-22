import React from "react";
import {Button} from "@components";
import { ICONS } from "@constants";

interface User {
  profilePic: string;
  username: string;
}

interface PostHeaderProps {
  user: User | null;
  onOptionClick: () => void;
  className?: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ user, onOptionClick, className = "" }) => {
  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <img
          src={user?.profilePic}
          alt="profilePic"
          className="w-8 h-8 rounded-full object-cover"
        />
        <h2 className="text-white text-xs">{user?.username}</h2>
      </div>
      <Button className="text-white" onClick={onOptionClick}>
        {ICONS.threeDots}
      </Button>
    </div>
  );
};

export default PostHeader;
