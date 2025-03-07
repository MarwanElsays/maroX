package com.marox.users.repository;

import com.marox.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Custom query to find a user by email
    Optional<User> findByEmail(String email);

    // Custom query to find a user by username
    Optional<User> findByUsername(String username);

    // Get all the followers of a user
    @Query(value = "select u.* from users as u join followers as f on u.user_id = f.follower_id where f.followed_id = :userId"
            , nativeQuery = true)
    List<User> findFollowers(@Param("userId") Long userId);

    // Get all the following of a user
    @Query(value = "select u.* from users as u join followers as f on u.user_id = f.followed_id where f.follower_id = :userId"
            , nativeQuery = true)
    List<User> findFollowing(@Param("userId") Long userId);
}
