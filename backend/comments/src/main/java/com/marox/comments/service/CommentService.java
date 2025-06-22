package com.marox.comments.service;

import com.marox.comments.dto.CommentDto;
import com.marox.comments.dto.CommentWithUserInfoDto;
import com.marox.comments.dto.UserInteractionDto;
import com.marox.comments.entity.Comment;
import com.marox.comments.repository.CommentRepository;
import com.marox.comments.service.client.users.UsersFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private UsersFeignClient usersFeignClient;

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

    public List<CommentWithUserInfoDto> getCommentsByPostId(Long postId) {
        List<CommentDto> comments = commentRepository.findByPostId(postId).stream().map(this::mapToCommentDto).toList();

        if (comments.isEmpty()) return Collections.emptyList();

        List<Long> userIds = comments.stream().map(CommentDto::getUserId).toList();

        List<UserInteractionDto> usersInteraction = Optional.ofNullable(
                        usersFeignClient.getUsersInteractedWithPost(userIds).getBody()
                ).orElse(Collections.emptyList());

        System.out.println("UsersInteraction: " + usersInteraction);

        Map<Long, UserInteractionDto> usersMap = usersInteraction.stream()
                .collect(Collectors.toMap(UserInteractionDto::getUserId, Function.identity()));

        System.out.println("UsersMap: " + usersMap);

        // Merge data (O(n) time)
        return comments.stream()
                .map(comment -> CommentWithUserInfoDto.builder()
                        .comment(comment)
                        .user(usersMap.get(comment.getUserId()))
                        .build())
                .peek(commentWithUser -> System.out.println("CommentWithUser: " + commentWithUser))
                .toList();
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

    public Long getCommentsCountByPostId(Long postId) {
        return commentRepository.countByPostId(postId);
    }

    public Map<Long, Long> getCommentsCountForPosts(List<Long> postIds) {
        // Get counts from DB
        List<Object[]> results = commentRepository.countCommentsByPostIds(postIds);
        // Convert to Map<postId, count>
        return results.stream()
                .collect(Collectors.toMap(
                        res -> (Long) res[0],  // postId
                        res -> (Long) res[1]   // count
                ));
    }

    private CommentDto mapToCommentDto(Comment comment) {
        return CommentDto.builder()
                .commentId(comment.getCommentId())
                .postId(comment.getPostId())
                .userId(comment.getUserId())
                .content(comment.getContent())
                .parentCommentId(comment.getParentCommentId())
                .build();
    }

}