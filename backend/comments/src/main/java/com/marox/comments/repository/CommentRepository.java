package com.marox.comments.repository;

import com.marox.comments.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
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

    // Custom query to count all comments for a specific post
    Long countByPostId(Long postId);

    // Custom query to get counts for multiple post IDs in one DB call
    @Query("""
        SELECT c.postId, COUNT(c) 
        FROM Comment c 
        WHERE c.postId IN :postIds 
        GROUP BY c.postId
        """)
    List<Object[]> countCommentsByPostIds(@Param("postIds") List<Long> postIds);
}