import { useAxiosWithAuth } from '@/hooks/useAxiosWithAuth';
import { UserInteractionDto } from '@/types/Interactions';
import { UserProfileInfo } from '@/types/UserTypes';
import { UserRequestDto, UserResponseDto } from '@/types/UserTypes';
import axios, { AxiosError, AxiosResponse } from 'axios';

const API_GATEWAY_BASE_URL = 'http://localhost:8072'; // API Gateway URL
const USER_SERVICE_PREFIX = '/marox/users/api'; // Route prefix in gateway

export const useUsersService = () => {

  const axiosWithAuth = useAxiosWithAuth();
  
  // Create User
  const createUser = async (userData: UserRequestDto): Promise<number> => {
    try {
      const response: AxiosResponse<number> = await axiosWithAuth.post(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/createUser`,
        userData
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Get All Users
  const getAllUsers = async (): Promise<UserResponseDto[]> => {
    try {
      const response: AxiosResponse<UserResponseDto[]> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getAllUsers`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Get User by ID
  const getUserById = async (userId: number): Promise<UserResponseDto> => {
    try {
      const response: AxiosResponse<UserResponseDto> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getUser/${userId}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Get User by Email
  const getUserByEmail = async (email: string): Promise<UserResponseDto> => {
    try {
      const response: AxiosResponse<UserResponseDto> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getUserByEmail/${email}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Get User by Username
  const getUserByUserName = async (username: string): Promise<UserResponseDto> => {
    try {
      const response: AxiosResponse<UserResponseDto> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getUserByUserName/${username}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Update User
  const updateUser = async (userData: UserRequestDto): Promise<void> => {
    try {
      await axiosWithAuth.put(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/updateUser/${userData.userId}`,
        userData
      );
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Delete User
  const deleteUser = async (userId: number): Promise<void> => {
    try {
      await axiosWithAuth.delete(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/deleteUser/${userId}`
      );
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Get User Profile
  const getUserProfile = async (userId: number): Promise<UserProfileInfo> => {
    try {
      const response: AxiosResponse<UserProfileInfo> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getUserProfile/${userId}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Get Followers
  const getFollowers = async (userId: number): Promise<UserInteractionDto[]> => {
    try {
      const response: AxiosResponse<UserInteractionDto[]> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getFollowers/${userId}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Get Following
  const getFollowing = async (userId: number): Promise<UserInteractionDto[]> => {
    try {
      const response: AxiosResponse<UserInteractionDto[]> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getFollowing/${userId}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Follow User
  const followUser = async (userId: number, followedUserId: number): Promise<string> => {
    try {
      const response: AxiosResponse<string> = await axiosWithAuth.post(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/followUser?userId=${userId}&followedUserId=${followedUserId}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Unfollow User
  const unfollowUser = async (userId: number, unfollowedUserId: number): Promise<string> => {
    try {
      const response: AxiosResponse<string> = await axiosWithAuth.post(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/unfollowUser?userId=${userId}&unfollowedUserId=${unfollowedUserId}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Get Users Interacted With Post
  const getUsersInteractedWithPost = async (postIds: number[]): Promise<UserInteractionDto[]> => {
    try {
      const response: AxiosResponse<UserInteractionDto[]> = await axiosWithAuth.post(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/interactedUsers`,
        postIds
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  const isFollowed = async (userId: number, followedUserId: number): Promise<boolean> => {
    try {
      const response: AxiosResponse<boolean> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/isFollowed/${userId}/${followedUserId}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      return false;
    }
  }

  // Error handling helper
  const handleError = (error: unknown): void => {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        // The request was made and the server responded with a status code
        console.error('Response error:', axiosError.response.data);
        console.error('Status code:', axiosError.response.status);
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error('No response received:', axiosError.request);
      } else {
        // Something happened in setting up the request
        console.error('Request setup error:', axiosError.message);
      }
    } else {
      console.error('Unexpected error:', error);
    }
  }

  return {
    createUser,
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUserName,
    updateUser,
    deleteUser,
    getUserProfile,
    getFollowers,
    getFollowing,
    followUser,
    unfollowUser,
    getUsersInteractedWithPost,
    isFollowed
  };
}
