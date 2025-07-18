package com.marox.posts.controller;

import com.marox.posts.dto.AccountsContactInfoDto;
import com.marox.posts.dto.PostRequestDto;
import com.marox.posts.dto.PostResponseDto;
import com.marox.posts.dto.UserInteractionDto;
import com.marox.posts.service.PostService;
import com.marox.posts.utilities.FileStorageUtil;
import io.github.resilience4j.retry.annotation.Retry;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.core.io.Resource;
import java.util.List;

@RestController
@RequestMapping("/api")
@Validated
public class PostController {

    @Autowired
    private PostService postService;
    @Autowired
    private AccountsContactInfoDto accountsContactInfoDto;
    @Autowired
    private FileStorageUtil fileStorageUtil;


    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @PostMapping("/createPost")
    public ResponseEntity<Long> createPost(@Valid @ModelAttribute PostRequestDto postDto) {
        Long createdPostId = postService.createPost(postDto);
        return new ResponseEntity<>(createdPostId, HttpStatus.CREATED);
    }

    @GetMapping("/getAllPosts")
    public ResponseEntity<List<PostResponseDto>> getAllPosts() {
        List<PostResponseDto> posts = postService.getAllPosts();
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }

    @GetMapping("getPostById/{postId}")
    public ResponseEntity<PostResponseDto> getPostById(@PathVariable Long postId) {
        PostResponseDto post = postService.getPostById(postId);
        return new ResponseEntity<>(post, HttpStatus.OK);
    }

    @Retry(name= "getPostsByUserId", fallbackMethod = "getPostsByUserIdFallback")
    @GetMapping("getPostsByUserId/{userId}")
    public ResponseEntity<List<PostResponseDto>> getPostsByUserId(@PathVariable Long userId) {
        logger.debug("getPostsByUserId called");
        List<PostResponseDto> posts = postService.getPostsByUserId(userId);
        return new ResponseEntity<>(posts, HttpStatus.OK);
    }
    public ResponseEntity<List<PostResponseDto>> getPostsByUserIdFallback(@PathVariable Long userId, Throwable throwable) {
        logger.debug("getPostsByUserId-Fallback called due to: {}", throwable.getMessage());
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
    @PutMapping("updatePost/{postId}")
    public ResponseEntity<Void> updatePost(@Valid @ModelAttribute PostRequestDto postDto) {
        postService.updatePost(postDto);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("deletePost/{postId}")
    public ResponseEntity<Void> deletePost(@PathVariable Long postId) {
        postService.deletePost(postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/likePost")
    public ResponseEntity<Void> likePost(@RequestParam("userId") Long userId, @RequestParam("postId") Long postId) {
        postService.likePost(userId, postId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping("/unlikePost")
    public ResponseEntity<Void> unlikePost(@RequestParam("userId") Long userId, @RequestParam("postId") Long postId) {
        postService.unlikePost(userId, postId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/getPostLikesWithUsersInfo/{postId}")
    public ResponseEntity<List<UserInteractionDto>> getPostLikesWithUsersInfo(@PathVariable Long postId) {
        List<UserInteractionDto> usersLikesInfo= postService.getPostLikesWithUsersInfo(postId);
        return new ResponseEntity<>(usersLikesInfo, HttpStatus.OK);
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/getImage/{fileName:.+}")
    public ResponseEntity<Resource> getImage(@PathVariable String fileName) {
        try {
            Resource file = fileStorageUtil.loadFile(fileName);
            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + file.getFilename() + "\"")
                    .body(file);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getContactInfo")
    public ResponseEntity<AccountsContactInfoDto> getContactInfo() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(accountsContactInfoDto);
    }
}