export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type PostInfo = {
  postId: number;
  title: string;
  content: string;
  authorId: number;
  status: PostStatus;
  likesCount: number;
  commentsCount: number;
};