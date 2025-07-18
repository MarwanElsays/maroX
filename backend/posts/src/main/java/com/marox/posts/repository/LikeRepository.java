package com.marox.posts.repository;
import com.marox.posts.entity.Like;
import com.marox.posts.entity.LikeId;
import com.marox.posts.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LikeRepository extends JpaRepository<Like, LikeId> {
    @Query(value = "select count(l.post_Id) from likes as l where l.post_Id = :postId", nativeQuery = true)
    Long countLikesByPostId(@Param("postId") Long postId);

    @Query(value = "select user_id from likes where post_id = :postId", nativeQuery = true)
    List<Long> findUserIdsByPostId(@Param("postId") Long postId);

    @Query("SELECT l.id.post FROM Like l WHERE l.id.userId = :userId")
    List<Post> findLikedPostsByUserId(Long userId);
}
