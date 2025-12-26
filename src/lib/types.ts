import type { LucideIcon } from "lucide-react";

export type SocialPlatform = "Facebook" | "X" | "Instagram" | "LinkedIn" | "YouTube";

export type SocialAccount = {
  id: string;
  platform: SocialPlatform;
  username: string;
  avatarUrl: string;
  isConnected: boolean;
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

export type ScheduledPost = {
  id: string;
  platform: SocialPlatform;
  content: string;
  scheduledAt: Date;
  status: "scheduled" | "published";
};
