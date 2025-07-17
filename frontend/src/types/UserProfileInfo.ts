import { PostInfo } from "./PostInfo";

export type UserProfileInfo = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  numOfFollowers: number;
  numOfFollowing: number;
  posts: PostInfo[];
};
