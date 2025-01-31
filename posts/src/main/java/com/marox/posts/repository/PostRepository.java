package com.marox.posts.repository;

import com.marox.posts.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    // Custom query to find all posts by a specific author
    List<Post> findByAuthorId(Long authorId);
}