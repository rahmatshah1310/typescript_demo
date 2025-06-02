// types.ts
export interface Post {
  id: string;
  imageUrl: string;
  caption: string;
  likes: string[];
  commentCount: number;
}

export interface UserProfile {
  uid: string;
  username: string;
  fullName: string;
  followers: string[];
  following: string[];
}
