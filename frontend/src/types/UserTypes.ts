import { PostInfo } from "./PostInfo";

export type UserRole = 'ADMIN' | 'USER'; // Add other roles as needed

interface UserBaseDto {
    userId?: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
}

export interface UserRequestDto extends UserBaseDto {
    password: string;
}

export type UserResponseDto = UserBaseDto

export type UserProfileInfo = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  numOfFollowers: number;
  numOfFollowing: number;
  posts: PostInfo[];
};