import { arrayRemove, arrayUnion, collection, db, doc, getDoc, getDocs, updateDoc } from "@/firebase";
import { uploadToCloudinary } from "@utils";

export const getUserProfile = async (uid: string) => {
  const docRef = doc(db, "users", uid);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return snapshot.data();
  }
  throw new Error("User Profile Not found");
};

export const getAllUsers = async () => {
  const allUsers = await getDocs(collection(db, "users"));
  return allUsers.docs.map((doc) => doc.data());
};

export const uploadAvatar = async (file: File, userId: string): Promise<string> => {
  const imageUrl = await uploadToCloudinary(file);
  await updateDoc(doc(db, "users", userId), { profilePic: imageUrl });
  return imageUrl;
};

export const followUser = async (currentUserId: string, targetUserId: string) => {
  const currentUserRef = doc(db, "users", currentUserId);
  const targetUserRef = doc(db, "users", targetUserId);

  await updateDoc(currentUserRef, {
    following: arrayUnion(targetUserId),
  });

  await updateDoc(targetUserRef, {
    followers: arrayUnion(currentUserId),
  });
};

export const unfollowUser = async (currentUserId: string, targetUserId: string) => {
  const currentUserRef = doc(db, "users", currentUserId);
  const targetUserRef = doc(db, "users", targetUserId);

  await updateDoc(currentUserRef, {
    following: arrayRemove(targetUserId),
  });

  await updateDoc(targetUserRef, {
    followers: arrayRemove(currentUserId),
  });
};
