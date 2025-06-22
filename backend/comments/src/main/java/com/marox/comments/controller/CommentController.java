package com.marox.comments.controller;

import com.marox.comments.dto.AccountsContactInfoDto;
import com.marox.comments.dto.CommentDto;
import com.marox.comments.dto.CommentWithUserInfoDto;
import com.marox.comments.service.CommentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Validated
public class CommentController {

    @Autowired
    private CommentService commentService;

    @Autowired
    private AccountsContactInfoDto accountsContactInfoDto;

    @PostMapping("/createComment")
    public ResponseEntity<Long> createComment(@Valid @RequestBody CommentDto comment) {
        Long createdCommentId = commentService.createComment(comment);
        return new ResponseEntity<>(createdCommentId, HttpStatus.CREATED);
    }

    @GetMapping("/getAllComments")
    public ResponseEntity<List<CommentDto>> getAllComments() {
        List<CommentDto> comments = commentService.getAllComments();
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @GetMapping("getCommentById/{commentId}")
    public ResponseEntity<CommentDto> getCommentById(@PathVariable Long commentId) {
        CommentDto comment = commentService.getCommentById(commentId);
        return new ResponseEntity<>(comment, HttpStatus.OK);
    }

    @GetMapping("getCommentsByPostId/{postId}")
    public ResponseEntity<List<CommentWithUserInfoDto>> getCommentsByPostId(@PathVariable Long postId) {
        List<CommentWithUserInfoDto> comments = commentService.getCommentsByPostId(postId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PutMapping("updateComment/{commentId}")
    public ResponseEntity<CommentDto> updateComment(@PathVariable Long commentId,@Valid @RequestBody CommentDto comment) {
        commentService.updateComment(commentId, comment);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("deleteComment/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/getCommentCountByPostId/{postId}")
    public ResponseEntity<Long> getCommentCountByPostId(@PathVariable Long postId) {
        Long commentsCount = commentService.getCommentsCountByPostId(postId);
        return new ResponseEntity<>(commentsCount, HttpStatus.OK);
    }

    @GetMapping("/getCommentsCountByPostId/{postId}")
    public ResponseEntity<Long> getCommentsCountByPostId(@PathVariable Long postId) {
        Long commentsCount = commentService.getCommentsCountByPostId(postId);
        return new ResponseEntity<>(commentsCount, HttpStatus.OK);
    }

    @GetMapping("/getCommentsCountForPosts")
    public ResponseEntity<Map<Long, Long>> getCommentsCountForPosts(@RequestBody List<Long> postIds) {
        Map<Long, Long> commentCounts = commentService.getCommentsCountForPosts(postIds);
        return new ResponseEntity<>(commentCounts, HttpStatus.OK);
    }

    @GetMapping("/getContactInfo")
    public ResponseEntity<AccountsContactInfoDto> getContactInfo() {
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(accountsContactInfoDto);
    }
}