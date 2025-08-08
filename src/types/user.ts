export interface User {
  uid: string;
  email?: string;
  fullName?: string;
  username?: string;
  createdAt?: string;
  imageUrl?: string;
  profilePic?: string;
  message?: string;
  followers?: string[];
  following?: string[];
  userAvatar?: string; // Optional field for user avatar
  // any other fields...
}

import { User as FirebaseUser } from "firebase/auth";

export interface AppUser extends FirebaseUser {
  fullName?: string;
  username?: string;
  profilePic?: string;
  followers?: string[];
  following?: string[];
}

export interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
  activeSection: string | null;
  setActiveSection: (section: string | null) => void;
}

export interface Post {
  id: string;
  caption: string;
  imageUrl?: string;
  userId: string;
  username: string;
  profilePic?: string;
  createdAt: Date;
  likeCount: number;
  commentCount: number;
  likedBy?: string[];
  userAvatar?: string;
  openPostModal?: (post: Post) => void; // Optional function to open post modal
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  profilePic?: string;
  text: string;
  createdAt: Date;
  likeCount?: number;
  likedBy?: string[];
}

// Shared prop types for components
import { ReactNode, InputHTMLAttributes } from "react";

export interface ButtonProps {
  children: ReactNode;
  className?: string;
  type?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
}

export interface TabItem {
  id: string | number;
  icon: ReactNode;
  label: string;
}

export interface TabsProps {
  tabs: TabItem[] | null;
  activeTab: string | number;
  onTabChange: (id: string | number) => void;
}

export interface LinkConfig {
  name: string;
  icon?: ReactNode;
  route?: string;
  section?: string;
  onClick?: () => void;
}

export interface NavLinkProps {
  link: LinkConfig;
  isBottomBar?: boolean;
  isMdSidebar?: boolean;
  isCollapsed?: boolean;
  activeSection?: string;
  onLinkClick: (section: string) => void;
  userProfilePic?: string;
}

export interface AvatarUploadProps {
  className?: string;
  user: User | null;
}
