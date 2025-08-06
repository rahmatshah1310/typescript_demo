import { ICONS } from "@constants";
import { Skeleton } from "@components";
import PostTab from "./PostTab";

export const TabContent = ({ posts, postLoading, activeTab }) => {
  if (postLoading) {
    return (
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[...Array(9)].map((_, idx) => (
          <div key={idx}>
            <Skeleton className="h-[250px] bg-gray-800 w-full rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === "posts") {
    return !posts && users?.uid === users?.uid ? (
      <PostTab />
    ) : (
      <div className="mt-8 grid grid-cols-3 gap-4">
        {posts?.map((post) => (
          <div key={post.id} className="relative group cursor-pointer" onClick={() => openPostModal(post)}>
            <img src={post.imageUrl} alt={post.caption} className="w-full  md:h-[300px] rounded object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="text-white font-semibold flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <ICONS.likeOutline />
                  <span>{post.likeCount || 0}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ICONS.comment />
                  <span>{post.commentCount || 0}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (activeTab === "saved") {
    return <div className="mt-8">Saved content</div>;
  }

  if (activeTab === "tagged") {
    return <div className="mt-8">Tagged content</div>;
  }

  return null;
};

export default TabContent;
