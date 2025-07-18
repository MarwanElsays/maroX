import { PostResponseDto } from "@/types/PostInfo";

export interface ArticleCardProps {
  post: PostResponseDto;
  imageUrl?: string;
  badges?: string[];
  author: {
    name: string;
    avatar: string;
  };
}