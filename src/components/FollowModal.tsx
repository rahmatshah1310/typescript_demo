import React, { useState } from "react";
import { Modal, Button, CommentSkeleton } from "@components";
import { useAuthContext } from "@context";
import { useAllUsers } from "@api";

interface FollowModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "followers" | "following";
  users: UserType[];
  isLoading: boolean;
}

const FollowModal: React.FC<FollowModalProps> = ({ isOpen, users, onClose, type, isLoading }) => {
  const { user } = useAuthContext();
  const [followingStatus, setFollowingStatus] = useState<Record<string, boolean>>({});
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);

  const openUserModal = (user: UserType) => {
    setSelectedUser(user);
  };

  const closeUserModal = () => {
    setSelectedUser(null);
  };

  const handleToggleFollow = (uid: string) => {
    const isCurrentlyFollowing = followingStatus[uid];
    setFollowingStatus((prev) => ({
      ...prev,
      [uid]: !isCurrentlyFollowing,
    }));

    // TODO: Trigger follow/unfollow API mutation here
  };

  return (
    <>
      {/* MAIN FOLLOW MODAL */}
      <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl w-[85%]">
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded bg-[#121212] p-4 text-white">
            <div className="flex w-full items-center mb-4">
              <p className="text-xl mx-auto font-semibold capitalize">{type === "followers" ? "Followers" : "Following"}</p>

              <Button onClick={onClose} className="text-xs text-white">
                ❌
              </Button>
            </div>
            <div className="overflow-y-auto max-h-[400px]">
              {isLoading ? (
                <CommentSkeleton />
              ) : !users ? (
                <p className="text-center text-gray-400">No users found.</p>
              ) : (
                users.map((user) => (
                  <div key={user.uid} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <img src={user.profilePic} alt={user.username} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold">{user.username}</p>
                        <p className="text-sm text-gray-400">{user.fullName}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <Button onClick={() => openUserModal(user)} className="bg-gray-700 text-white px-3 py-1 rounded text-sm">
                        {type}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Modal>

      {/* SECOND MODAL for selected user */}
      <Modal isOpen={!!selectedUser} onClose={closeUserModal} className="max-w-xs w-[85%]">
        <div className="fixed inset-0 flex items-center justify-center p-4">
          {selectedUser && (
            <div className="w-full max-w-xs sm:max-w-sm rounded bg-[#1c1c1c] text-white">
              <div className="flex flex-col items-center p-6">
                <img src={selectedUser.profilePic} alt={selectedUser.username} className="w-20 h-20 rounded-full object-cover mb-2" />
                <p className="text-lg font-semibold">{selectedUser.username}</p>
                <p className="text-sm text-gray-400">{selectedUser.fullName}</p>
              </div>

              {user?.uid !== selectedUser.uid && (
                <Button className="w-full mt-4 text-[#ED4956] py-2 border-y border-[#ED4956]" onClick={() => handleToggleFollow(selectedUser.uid)}>
                  {followingStatus[selectedUser.uid] ? "Unfollow" : "Follow"}
                </Button>
              )}

              <Button onClick={closeUserModal} className="w-full text-white p-2">
                Cancel
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default FollowModal;
