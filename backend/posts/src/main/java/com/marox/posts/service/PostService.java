package com.marox.posts.service;

import com.marox.posts.dto.PostRequestDto;
import com.marox.posts.dto.PostResponseDto;
import com.marox.posts.dto.UserInteractionDto;
import com.marox.posts.entity.Like;
import com.marox.posts.entity.LikeId;
import com.marox.posts.entity.Post;
import com.marox.posts.enums.PostStatus;
import com.marox.posts.repository.LikeRepository;
import com.marox.posts.repository.PostRepository;
import com.marox.posts.service.client.comments.CommentsFeignClient;
import com.marox.posts.service.client.users.UsersFeignClient;
import com.marox.posts.utilities.FileStorageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private UsersFeignClient usersFeignClient;
    @Autowired
    private CommentsFeignClient commentsFeignClient;
    @Autowired
    private FileStorageUtil fileStorageUtil;

    public Long createPost(PostRequestDto postDto) {
        String savedFileName = fileStorageUtil.uploadFile(postDto.getImageFile());

        Post post = Post.builder()
                .title(postDto.getTitle())
                .content(postDto.getContent())
                .authorId(postDto.getAuthorId())
                .status(postDto.getStatus())
                .imageFileName(savedFileName)
                .build();

        return postRepository.save(post).getPostId();
    }

    public List<PostResponseDto> getAllPosts() {
        List<Object[]> results = postRepository.findAllPostsWithLikes();
        return mapResultsToPostDtos(results);
    }

    public PostResponseDto getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        long postLikesCount = likeRepository.countLikesByPostId(postId);
        long commentsCount = Optional.ofNullable(commentsFeignClient.getCommentsCountByPostId(postId).getBody())
                .orElse(0L);

        return mapToPostDto(post,postLikesCount,commentsCount);
    }

    public List<PostResponseDto> getPostsByUserId(Long userId) {
        List<Object[]> results = postRepository.findByAuthorIdWithLikes(userId);
        return mapResultsToPostDtos(results);
    }

    public void updatePost(PostRequestDto postDto) {
        Post post = postRepository.findById(postDto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Update post fields
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setAuthorId(postDto.getAuthorId());
        post.setStatus(postDto.getStatus());

        // Delete old image if present
        if (post.getImageFileName() != null) {
            fileStorageUtil.deleteFile(post.getImageFileName());
        }
        // Upload new image
        String newFileName = fileStorageUtil.uploadFile(postDto.getImageFile());
        post.setImageFileName(newFileName);

        // Save the updated post
        postRepository.save(post);
    }

    public void deletePost(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Delete image file
        if (post.getImageFileName() != null) {
            fileStorageUtil.deleteFile(post.getImageFileName());
        }

        postRepository.delete(post);
    }

    public void likePost(Long userId, Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        // Create the composite key for the Like
        LikeId likeId = LikeId.builder()
                .userId(userId)
                .post(post)
                .build();

        Like like = new Like();
        // Set the composite key
        like.setId(likeId);
        // Save the like entity
        likeRepository.save(like);
    }

    public void unlikePost(Long userId, Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        // Create the composite key for the Like
        LikeId likeId = LikeId.builder()
                .userId(userId)
                .post(post)
                .build();
        likeRepository.deleteById(likeId);
    }

    public List<UserInteractionDto> getPostLikesWithUsersInfo(Long postId) {
        List<Long> userIds = likeRepository.findUserIdsByPostId(postId);
        System.out.println(userIds);
        return Optional.ofNullable(usersFeignClient.getUsersInteractedWithPost(userIds).getBody())
                .orElse(Collections.emptyList());
    }


    public List<PostResponseDto> mapResultsToPostDtos(List<Object[]> results) {
        // 1. Extract post IDs from results
        List<Long> postIds = results.stream()
                .map(result -> (Long) result[2]) // postId is at index 2
                .toList();

        // 2. Fetch comment counts in bulk (single call)
        Map<Long, Long> commentCounts = Optional.ofNullable(commentsFeignClient.getCommentsCountForPosts(postIds).getBody())
                .orElse(Collections.emptyMap());

        // 3. Map results to PostDto with functional style
        return results.stream()
                .map(result -> {
                    Long authorId = (Long) result[0];
                    Long postId = (Long) result[2];
                    String content = (String) result[4];
                    String title = (String) result[5];
                    PostStatus status = PostStatus.valueOf((String) result[6]);
                    Long likeCount = (Long) result[7];
                    Long commentCount = commentCounts.getOrDefault(postId, 0L);
                    String imageFileName = ((String) result[8]);

                    return new PostResponseDto(postId, title, content, authorId, status, likeCount, commentCount, imageFileName);
                })
                .toList();
    }

    // Helper method to convert Post entity to PostDto
    private PostResponseDto mapToPostDto(Post post, long postLikesCount, long commentsCount) {
        return PostResponseDto.builder()
                .postId(post.getPostId())
                .title(post.getTitle())
                .content(post.getContent())
                .authorId(post.getAuthorId())
                .status(post.getStatus())
                .likesCount(postLikesCount)
                .commentsCount(commentsCount)
                .imageFileName(post.getImageFileName())
                .build();
    }

}