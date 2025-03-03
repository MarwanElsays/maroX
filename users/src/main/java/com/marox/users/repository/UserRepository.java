package com.marox.users.repository;

import com.marox.users.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Custom query to find a user by email
    Optional<User> findByEmail(String email);

    // Custom query to find a user by username
    Optional<User> findByUsername(String username);
}
