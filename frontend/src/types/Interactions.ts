export type CommentDto = {
  commentId: number;
  postId: number;
  userId: number;
  content: string;
  parentCommentId?: number;
};

export type UserInteractionDto = {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
};

export type CommentWithUserInfo = {
  comment: CommentDto;
  user: UserInteractionDto;
};