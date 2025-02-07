package com.marox.posts.service;

import com.marox.posts.dto.UserInteractionDto;
import com.marox.posts.entity.Like;
import com.marox.posts.entity.LikeId;
import com.marox.posts.entity.Post;
import com.marox.posts.enums.PostStatus;
import com.marox.posts.repository.LikeRepository;
import com.marox.posts.repository.PostRepository;
import com.marox.posts.dto.PostDto;
import com.marox.posts.service.client.UsersFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;
    @Autowired
    private LikeRepository likeRepository;
    @Autowired
    private UsersFeignClient usersFeignClient;

    public Long createPost(PostDto postDto) {
        // Convert DTO to entity
        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setAuthorId(postDto.getAuthorId());
        post.setStatus(postDto.getStatus());

        // Save the post to the database
        Post savedPost = postRepository.save(post);

        // Convert entity back to DTO
        return savedPost.getPostId();
    }

    public List<PostDto> getAllPosts() {
        List<Object[]> results = postRepository.findAllPostsWithLikes();
        return mapResultsToPostDtos(results);
    }

    public PostDto getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        int postLikesCount = likeRepository.countLikesByPostId(postId);

        return mapToPostDto(post,postLikesCount);
    }

    public List<PostDto> getPostsByUserId(Long userId) {
        List<Object[]> results = postRepository.findByAuthorIdWithLikes(userId);
        return mapResultsToPostDtos(results);
    }

    public void updatePost(PostDto postDto) {
        Post post = postRepository.findById(postDto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found"));

        // Update post fields
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setAuthorId(postDto.getAuthorId());
        post.setStatus(postDto.getStatus());

        // Save the updated post
        postRepository.save(post);
    }

    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
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
        return Optional.ofNullable(usersFeignClient.getLikesUsersInfo(userIds).getBody())
                .orElse(Collections.emptyList());
    }

    public List<PostDto> mapResultsToPostDtos(List<Object[]> results) {
        List<PostDto> postDtos = new ArrayList<>();
        for (Object[] result : results) {
            Long authorId = (Long) result[0];
            Long postId = (Long) result[2];
            String content = (String) result[4];
            String title = (String) result[5];
            PostStatus status = PostStatus.valueOf((String) result[6]);
            Long likeCount = (Long) result[7];

            PostDto postDto = new PostDto(postId, title, content, authorId, status, likeCount);
            postDtos.add(postDto);
        }
        return postDtos;
    }

    // Helper method to convert Post entity to PostDto
    private PostDto mapToPostDto(Post post, int postLikesCount) {
        return PostDto.builder()
                .postId(post.getPostId())
                .title(post.getTitle())
                .content(post.getContent())
                .authorId(post.getAuthorId())
                .status(post.getStatus())
                .LikesCount(postLikesCount)
                .build();
    }

}