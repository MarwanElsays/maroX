package com.marox.comments.service;

import com.marox.comments.dto.CommentDto;
import com.marox.comments.entity.Comment;
import com.marox.comments.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;

    public Long createComment(CommentDto commentDto) {
        // Convert DTO to entity
        Comment comment = new Comment();
        comment.setPostId(commentDto.getPostId());
        comment.setUserId(commentDto.getUserId());
        comment.setContent(commentDto.getContent());
        comment.setParentCommentId(commentDto.getParentCommentId());

        // Save the comment to the database
        Comment savedComment = commentRepository.save(comment);

        // Convert entity back to DTO
        return savedComment.getCommentId();
    }

    public List<CommentDto> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        return comments.stream()
                .map(this::mapToCommentDto)
                .collect(Collectors.toList());
    }

    public CommentDto getCommentById(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));
        return mapToCommentDto(comment);
    }

    public List<CommentDto> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        return comments.stream()
                .map(this::mapToCommentDto)
                .collect(Collectors.toList());
    }

    public void updateComment(Long commentId, CommentDto commentDto) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        // Update comment fields
        comment.setPostId(commentDto.getPostId());
        comment.setUserId(commentDto.getUserId());
        comment.setContent(commentDto.getContent());
        //comment.setParentCommentId(commentDto.getParentCommentId());

        // Save the updated comment
        Comment updatedComment = commentRepository.save(comment);

        // Convert entity back to DTO
        //return mapToCommentDto(updatedComment);
    }

    public void deleteComment(Long commentId) {
        commentRepository.deleteById(commentId);
    }

    private CommentDto mapToCommentDto(Comment comment) {
        return CommentDto.builder()
                .postId(comment.getPostId())
                .userId(comment.getUserId())
                .content(comment.getContent())
                .parentCommentId(comment.getParentCommentId())
                .build();
    }

}