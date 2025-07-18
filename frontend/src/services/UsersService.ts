import { UserInteractionDto } from '@/types/Interactions';
import { UserProfileInfo } from '@/types/UserTypes';
import { UserRequestDto, UserResponseDto } from '@/types/UserTypes';
import axios, { AxiosError, AxiosResponse } from 'axios';


const API_GATEWAY_BASE_URL = 'http://localhost:8072'; // API Gateway URL
const USER_SERVICE_PREFIX = '/marox/users/api'; // Route prefix in gateway


class UserService {
  // Create User
  async createUser(userData: UserRequestDto): Promise<number> {
    try {
      const response: AxiosResponse<number> = await axios.post(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/createUser`,
        userData
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get All Users
  async getAllUsers(): Promise<UserResponseDto[]> {
    try {
      const response: AxiosResponse<UserResponseDto[]> = await axios.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getAllUsers`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get User by ID
  async getUserById(userId: number): Promise<UserResponseDto> {
    try {
      const response: AxiosResponse<UserResponseDto> = await axios.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getUser/${userId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get User by Email
  async getUserByEmail(email: string): Promise<UserResponseDto> {
    try {
      const response: AxiosResponse<UserResponseDto> = await axios.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getUserByEmail/${email}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get User by Username
  async getUserByUserName(username: string): Promise<UserResponseDto> {
    try {
      const response: AxiosResponse<UserResponseDto> = await axios.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getUserByUserName/${username}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Update User
  async updateUser(userData: UserRequestDto): Promise<void> {
    try {
      await axios.put(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/updateUser/${userData.userId}`,
        userData
      );
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Delete User
  async deleteUser(userId: number): Promise<void> {
    try {
      await axios.delete(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/deleteUser/${userId}`
      );
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get User Profile
  async getUserProfile(userId: number): Promise<UserProfileInfo> {
    try {
      const response: AxiosResponse<UserProfileInfo> = await axios.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getUserProfile/${userId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get Followers
  async getFollowers(userId: number): Promise<UserInteractionDto[]> {
    try {
      const response: AxiosResponse<UserInteractionDto[]> = await axios.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getFollowers/${userId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get Following
  async getFollowing(userId: number): Promise<UserInteractionDto[]> {
    try {
      const response: AxiosResponse<UserInteractionDto[]> = await axios.get(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/getFollowing/${userId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Follow User
  async followUser(userId: number, followedUserId: number): Promise<string> {
    try {
      const response: AxiosResponse<string> = await axios.post(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/followUser?userId=${userId}&followedUserId=${followedUserId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Unfollow User
  async unfollowUser(userId: number, unfollowedUserId: number): Promise<string> {
    try {
      const response: AxiosResponse<string> = await axios.post(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/unfollowUser?userId=${userId}&unfollowedUserId=${unfollowedUserId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get Users Interacted With Post
  async getUsersInteractedWithPost(postIds: number[]): Promise<UserInteractionDto[]> {
    try {
      const response: AxiosResponse<UserInteractionDto[]> = await axios.post(
        `${API_GATEWAY_BASE_URL}${USER_SERVICE_PREFIX}/interactedUsers`,
        postIds
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Error handling helper
  private handleError(error: unknown): void {
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
}

// Export a singleton instance of the service
export const userService = new UserService();