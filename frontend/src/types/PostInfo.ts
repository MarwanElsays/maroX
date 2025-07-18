export type PostStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type PostRequestDto = {
  postId: number;
  title: string;
  content: string;
  authorId: number;
  status: PostStatus;
  imageFile?: File;
};

export type PostResponseDto = {
  postId: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: string; 
  status: PostStatus;
  likesCount: number;
  commentsCount: number;
  imageFileName?: string;
};
