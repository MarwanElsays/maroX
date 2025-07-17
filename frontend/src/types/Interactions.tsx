export interface CommentDto {
  commentId: number;
  postId: number;
  userId: number;
  content: string;
  parentCommentId?: number;
}

export interface UserInteractionDto {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
}

export interface CommentWithUserInfo {
  comment: CommentDto;
  user: UserInteractionDto;
}