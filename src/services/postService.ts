import {
  db,
  collection,
  addDoc,
  Timestamp,
  getDoc,
  query,
  orderBy,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  increment,
  where,
} from "@/firebase";
import { uploadToCloudinary } from "@utils";
import { Post, Comment } from "@types";

export type CreatePostInput = {
  caption: string;
  imageUrl?: string;
  userId: string;
  username: string;
  profilePic?: string;
};

export const uploadPostImage = async (file: File): Promise<string> => {
  return await uploadToCloudinary(file);
};

export const createPost = async (postData: CreatePostInput): Promise<Post> => {
  const docRef = await addDoc(collection(db, "posts"), {
    ...postData,
    createdAt: Timestamp.now(),
    likeCount: 0,
    commentCount: 0,
  });
  return { id: docRef.id, ...postData, likeCount: 0, commentCount: 0 } as Post;
};

export const getPosts = async (): Promise<Post[]> => {
  const postRef = await collection(db, "posts");
  const q = query(postRef, orderBy("createdAt", "desc"));
  const querysnapshot = await getDocs(q);
  const posts = querysnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];
  return posts;
};

export const getPostById = async (postId: string): Promise<Post> => {
  const posDoctRef = await doc(db, "posts", postId);
  const postSnaphsot = await getDoc(posDoctRef);
  if (!postSnaphsot.exists()) {
    throw new Error("Post not found");
  }

  return {
    id: postSnaphsot.id,
    ...postSnaphsot.data(),
  } as Post;
};

export const getPostByFollowers = async (followUserIds: string[]): Promise<Post[]> => {
  const postsRef = collection(db, "posts");
  const q = query(postsRef, where("userId", "in", followUserIds));
  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Post[];
  return posts;
};

export const deletePost = async (postId: string) => {
  const postRef = await doc(db, "posts", postId);
  await deleteDoc(postRef);
};

export const commentOnPost = async ({ postId, user, text }) => {
  const commentRef = collection(db, "posts", postId, "comments");
  const commentData = {
    userId: user.uid,
    username: user.username,
    profilePic: user.profilePic,
    text,
    createdAt: Timestamp.now(),
  };
  const docRef = await addDoc(commentRef, commentData);

  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    commentCount: increment(1),
  });

  return {
    ...commentData,
    id: docRef.id,
  };
};

export const getComments = async (postId: string): Promise<Comment[]> => {
  const commentsRef = collection(db, "posts", postId, "comments");
  const q = query(commentsRef, orderBy("createdAt", "asc")); // or 'desc'
  const querySnapshot = await getDocs(q);

  const comments = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Comment[];

  return comments;
};

export const deleteComment = async ({ postId, commentId }) => {
  const commentRef = doc(db, "posts", postId, "comments", commentId);
  await deleteDoc(commentRef);

  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);
  const currentCount = postSnap.data()?.commentCount || 0;

  if (currentCount > 0) {
    await updateDoc(postRef, {
      commentCount: increment(-1),
    });
  }
};

export const likePost = async ({ postId, userId }) => {
  const postRef = doc(db, "posts", postId);
  await updateDoc(postRef, {
    likedBy: arrayUnion(userId),
    likeCount: increment(1),
  });
};

export const dislikePost = async ({ postId, userId }) => {
  const postRef = doc(db, "posts", postId);
  const postSnap = await getDoc(postRef);
  const currentCount = postSnap.data()?.likeCount || 0;

  if (currentCount > 0) {
    await updateDoc(postRef, {
      likedBy: arrayRemove(userId),
      likeCount: increment(-1),
    });
  } else {
    await updateDoc(postRef, {
      likedBy: arrayRemove(userId),
    });
  }
};
