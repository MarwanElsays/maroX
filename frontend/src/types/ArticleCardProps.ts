import { PostInfo } from "@/types/PostInfo";

export interface ArticleCardProps {
  post: PostInfo;
  image?: string;
  badges?: string[];
  author?: {
    name: string;
    avatar: string;
  };
  postedAt?: string;
}