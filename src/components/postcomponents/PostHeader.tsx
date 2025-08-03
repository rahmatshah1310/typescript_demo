import { ICONS } from "@constants";
import { useAuthContext } from "@context";
import { Button } from "@components";
const PostHeader = ({ onOptionClick, className }) => {
  const { user } = useAuthContext();
  return (
    <div className={`flex justify-between ${className}`}>
      <div className="flex gap-3">
        <img src={user?.profilePic} alt="userprofile" className="w-8 h-8 rounded-full object-cover" />
        <span className=" text-white">{user?.username}</span>
      </div>
      <div>
        <Button onClick={onOptionClick} className="text-white">
          <ICONS.ellipsis />
        </Button>
      </div>
    </div>
  );
};

export default PostHeader;
