import { UserInteractionDto } from '@/types/Interactions';
import { PostRequestDto, PostResponseDto } from '@/types/PostInfo';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useAxiosWithAuth } from '@/hooks/useAxiosWithAuth';

const API_GATEWAY_BASE_URL = 'http://localhost:8072'; // API Gateway URL
const POST_SERVICE_PREFIX = '/marox/posts/api'; // Route prefix in gateway

export const usePostsService = () => {

  const axiosWithAuth = useAxiosWithAuth();

  const convertToFormData = (postData: PostRequestDto):FormData => {
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
  const createPost = async(postData: PostRequestDto): Promise<number> => {
    try {
      const formData = convertToFormData(postData);
      // Send the form data to the backend
      const response: AxiosResponse<number> = await axiosWithAuth.post(
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
      handleError(error);
      throw error;
    }
  }

  // Get all posts
  const getAllPosts = async (): Promise<PostResponseDto[]> => {
    try {
      const response: AxiosResponse<PostResponseDto[]> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/getAllPosts`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Get post by ID
  const getPostById = async (postId: number): Promise<PostResponseDto> => {
    try {
      const response: AxiosResponse<PostResponseDto> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/getPostById/${postId}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Get posts by user ID (with retry logic)
  const getPostsByUserId = async (userId: number): Promise<PostResponseDto[]> => {
    try {
      const response: AxiosResponse<PostResponseDto[]> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/getPostsByUserId/${userId}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Update a post
  const updatePost = async (postData: PostRequestDto): Promise<void> => {
    try {
      const formData = convertToFormData(postData);
      // Send the form data to the backend
      await axiosWithAuth.put(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/updatePost/${postData.postId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Delete a post
  const deletePost = async (postId: number): Promise<void> => {
    try {
      await axiosWithAuth.delete(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/deletePost/${postId}`
      );
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Like a post
  const likePost = async (userId: number, postId: number): Promise<void> => {
    try {
      await axiosWithAuth.post(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/likePost?userId=${userId}&postId=${postId}`
      );
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Unlike a post
  const unlikePost = async (userId: number, postId: number): Promise<void> => {
    try {
      await axiosWithAuth.delete(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/unlikePost?userId=${userId}&postId=${postId}`
      );
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  // Get post likes with user info
  const getPostLikesWithUsersInfo = async (postId: number): Promise<UserInteractionDto[]> => {
    try {
      const response: AxiosResponse<UserInteractionDto[]> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/getPostLikesWithUsersInfo/${postId}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  const getImageUrl = (authorId: number, fileName: string): string => {
    return `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/getImage/${authorId}/${encodeURIComponent(fileName)}`;
  }

  // Get post likes with user info
  const getUserLikedPosts = async (userId: number): Promise<PostResponseDto[]> => {
    try {
      const response: AxiosResponse<PostResponseDto[]> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/getUserLikedPosts/${userId}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
    }
  }

  const isPostLiked = async (userId: number, postId: number): Promise<boolean> => {
    try {
      const response: AxiosResponse<boolean> = await axiosWithAuth.get(
        `${API_GATEWAY_BASE_URL}${POST_SERVICE_PREFIX}/isPostLiked?userId=${userId}&postId=${postId}`
      );
      return response.data;
    } catch (error) {
      handleError(error);
      throw error;
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
    createPost,
    getAllPosts,
    getPostById,
    getPostsByUserId,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    getPostLikesWithUsersInfo,
    getImageUrl,
    getUserLikedPosts,
    isPostLiked,
  };
}