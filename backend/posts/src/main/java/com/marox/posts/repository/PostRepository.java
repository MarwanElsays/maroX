package com.marox.posts.repository;

import com.marox.posts.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // Custom query to find all posts by a specific author
    List<Post> findByAuthorId(Long authorId);

    @Query(value = "SELECT p.*, COUNT(l.post_id) AS like_count " +
            "FROM posts as p " +
            "LEFT JOIN likes as l ON p.post_id = l.post_id " +
            "GROUP BY p.post_id", nativeQuery = true)
    List<Object[]> findAllPostsWithLikes();

    @Query(value = "SELECT p.*, COUNT(l.post_id) AS like_count " +
            "FROM posts as p " +
            "LEFT JOIN likes as l ON p.post_id = l.post_id " +
            "WHERE p.author_id = :authorId " +
            "GROUP BY p.post_id", nativeQuery = true)
    List<Object[]> findByAuthorIdWithLikes(@Param("authorId") Long authorId);
}