package com.marox.comments.repository;

import com.marox.comments.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // Custom query to find all comments for a specific post
    List<Comment> findByPostId(Long postId);

    // Custom query to find all comments by a specific user
    List<Comment> findByUserId(Long userId);

    // Custom query to find all replies to a specific comment (nested comments)
    List<Comment> findByParentCommentId(Long parentCommentId);
}