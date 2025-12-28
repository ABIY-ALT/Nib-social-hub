import type { LucideIcon } from "lucide-react";

export type SocialPlatform = "Facebook" | "X" | "Instagram" | "LinkedIn" | "YouTube" | "TikTok";

export type SocialAccount = {
  id: string;
  platform: SocialPlatform;
  username: string;
  avatarUrl: string;
  isConnected: boolean;
  permissions: string[];
};

export type Mention = {
  id: string;
  platform: SocialPlatform;
  author: string;
  authorHandle: string;
  avatarUrl: string;
  content: string;
  timestamp: string;
  sentiment: "positive" | "negative" | "neutral";
};

export type PostStatus = "draft" | "pending" | "scheduled" | "approved" | "published";

export type ScheduledPost = {
  id: string;
  platform: SocialPlatform;
  content: string;
  scheduledAt: Date;
  status: PostStatus;
};

export type Conversation = {
  id: string;
  platform: SocialPlatform;
  type: 'message' | 'comment';
  author: string;
  authorHandle: string;
  avatarUrl: string;
  timestamp: string;
  content: string;
  isRead: boolean;
  sentiment: "positive" | "negative" | "neutral";
  replies: {
    author: string;
    avatarUrl: string;
    content: string;
    timestamp: string;
  }[];
};
