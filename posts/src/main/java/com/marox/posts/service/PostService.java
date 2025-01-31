package com.marox.posts.service;

import com.marox.posts.entity.Post;
import com.marox.posts.repository.PostRepository;
import com.marox.posts.dto.PostDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

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
        List<Post> posts = postRepository.findAll();
        return posts.stream()
                .map(this::mapToPostDto)
                .collect(Collectors.toList());
    }

    public PostDto getPostById(Long postId) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found"));
        return mapToPostDto(post);
    }

    public List<PostDto> getPostsByUserId(Long userId) {
        List<Post> posts = postRepository.findByAuthorId(userId);
        return posts.stream()
                .map(this::mapToPostDto)
                .collect(Collectors.toList());
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
        Post updatedPost = postRepository.save(post);
    }

    public void deletePost(Long postId) {
        postRepository.deleteById(postId);
    }

    // Helper method to convert Post entity to PostDto
    private PostDto mapToPostDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setPostId(post.getPostId());
        postDto.setTitle(post.getTitle());
        postDto.setContent(post.getContent());
        postDto.setAuthorId(post.getAuthorId());
        postDto.setStatus(post.getStatus());
        return postDto;
    }
}