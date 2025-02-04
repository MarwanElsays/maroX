package com.marox.posts.controller;

import com.marox.posts.dto.PostDto;
import com.marox.posts.dto.AccountsContactInfoDto;
import com.marox.posts.service.PostService;
import io.github.resilience4j.retry.annotation.Retry;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Validated
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private AccountsContactInfoDto accountsContactInfoDto;

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @PostMapping("/createPost")
    public ResponseEntity<Long> createPost(@Valid @RequestBody PostDto postDto) {
        Long createdPostId = postService.createPost(postDto);
        return new ResponseEntity<>(createdPostId, HttpStatus.CREATED);
    }

    @GetMapping("/getAllPosts")
    public ResponseEntity<List<PostDto>> getAllPosts() {
        List<PostDto> posts = postService.getAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("getPostById/{postId}")
    public ResponseEntity<PostDto> getPostById(@PathVariable Long postId) {
        PostDto post = postService.getPostById(postId);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @Retry(name= "getPostsByUserId", fallbackMethod = "getPostsByUserIdFallback")
    @GetMapping("getPostsByUserId/{userId}")
    public ResponseEntity<List<PostDto>> getPostsByUserId(@PathVariable Long userId) {
        logger.debug("getPostsByUserId called");
        List<PostDto> posts = postService.getPostsByUserId(userId);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }
    public ResponseEntity<List<PostDto>> getPostsByUserIdFallback(@PathVariable Long userId, Throwable throwable) {
        logger.debug("getPostsByUserId-Fallback called due to: {}", throwable.getMessage());
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @PutMapping("updatePost/{postId}")
    public ResponseEntity<Void> updatePost(@Valid @RequestBody PostDto postDto) {
        postService.updatePost(postDto);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("deletePost/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/getContactInfo")
    public ResponseEntity<AccountsContactInfoDto> getContactInfo() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(accountsContactInfoDto);
    }
}