import { UserInteractionDto } from '@/types/Interactions';
import { PostRequestDto, PostResponseDto } from '@/types/PostInfo';
import axios, { AxiosError, AxiosResponse } from 'axios';

const API_GATEWAY_BASE_URL = 'http://localhost:8072'; // API Gateway URL
const POST_SERVICE_PREFIX = '/marox/posts/api'; // Route prefix in gateway

class PostsService {

  private convertToFormData(postData: PostRequestDto): FormData {
    const formData = new FormData();
    formData.append("postId", postData.postId.toString());
    formData.append("title", postData.title);
    formData.append("content", postData.content);
    formData.append("authorId", postData.authorId.toString());
    formData.append("status", postData.status);
    if (postData.imageFile) {
      formData.append("imageFile", postData.imageFile); // Must match backend field name
    }
    return formData;
  }
  
  // Create a new post
  async createPost(postData: PostRequestDto): Promise<number> {
    try {
      const formData = this.convertToFormData(postData);
      // Send the form data to the backend
      const response: AxiosResponse<number> = await axios.post(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/createPost`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get all posts
  async getAllPosts(): Promise<PostResponseDto[]> {
    try {
      const response: AxiosResponse<PostResponseDto[]> = await axios.get(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/getAllPosts`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get post by ID
  async getPostById(postId: number): Promise<PostResponseDto> {
    try {
      const response: AxiosResponse<PostResponseDto> = await axios.get(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/getPostById/${postId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get posts by user ID (with retry logic)
  async getPostsByUserId(userId: number): Promise<PostResponseDto[]> {
    try {
      const response: AxiosResponse<PostResponseDto[]> = await axios.get(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/getPostsByUserId/${userId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Update a post
  async updatePost(postData: PostRequestDto): Promise<void> {
    try {
      const formData = this.convertToFormData(postData);
      // Send the form data to the backend
      await axios.put(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/updatePost/${postData.postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Delete a post
  async deletePost(postId: number): Promise<void> {
    try {
      await axios.delete(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/deletePost/${postId}`
      );
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Like a post
  async likePost(userId: number, postId: number): Promise<void> {
    try {
      await axios.post(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/likePost?userId=${userId}&postId=${postId}`
      );
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Unlike a post
  async unlikePost(userId: number, postId: number): Promise<void> {
    try {
      await axios.delete(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/unlikePost?userId=${userId}&postId=${postId}`
      );
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  // Get post likes with user info
  async getPostLikesWithUsersInfo(postId: number): Promise<UserInteractionDto[]> {
    try {
      const response: AxiosResponse<UserInteractionDto[]> = await axios.get(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/getPostLikesWithUsersInfo/${postId}`
      );
      return response.data;
    } catch (error) {
      this.handleError(error);
      throw error;
    }
  }

  getImageUrl(authorId: number, fileName: string): string {
    return `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/getImage/${authorId}/${encodeURIComponent(fileName)}`;
  }

  // Get post likes with user info
  async getUserLikedPosts(userId: number): Promise<PostResponseDto[]> {
    try {
      const response: AxiosResponse<PostResponseDto[]> = await axios.get(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/getUserLikedPosts/${userId}`
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
export const postsService = new PostsService();