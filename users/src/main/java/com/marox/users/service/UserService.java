package com.marox.users.service;

import com.marox.users.dto.*;
import com.marox.users.entity.User;
import com.marox.users.repository.UserRepository;
import com.marox.users.service.client.PostsFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PostsFeignClient postsFeignClient;

    public Long createUser(UserRequestDto userRequestDto) {
        // Convert DTO to entity using builder pattern
        User user = User.builder()
                .username(userRequestDto.getUsername())
                .email(userRequestDto.getEmail())
                .password(userRequestDto.getPassword())
                .firstName(userRequestDto.getFirstName())
                .lastName(userRequestDto.getLastName())
                .role(userRequestDto.getRole())
                .build();

        // Save the user to the database
        User savedUser = userRepository.save(user);

        // Return the user ID
        return savedUser.getUserId();
    }

    public List<UserResponseDto> getAllUsers() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::mapToUserResponseDto)
                .collect(Collectors.toList());
    }

    public UserResponseDto getUserById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToUserResponseDto(user);
    }

    public UserResponseDto getUserByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToUserResponseDto(user);
    }

    public UserResponseDto getUserByUserName(String userName) {
        User user = userRepository.findByUsername(userName)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return mapToUserResponseDto(user);
    }

    public void updateUser(UserRequestDto userRequestDto) {
        User user = userRepository.findById(userRequestDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Update user fields
        user.setUsername(userRequestDto.getUsername());
        user.setEmail(userRequestDto.getEmail());
        user.setPassword(userRequestDto.getPassword());
        user.setFirstName(userRequestDto.getFirstName());
        user.setLastName(userRequestDto.getLastName());
        user.setRole(userRequestDto.getRole());

        // Save the updated user
        userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    public UserProfileDto getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<PostDto> posts = Optional.ofNullable(postsFeignClient.getPostsByUserId(userId).getBody())
                .orElse(Collections.emptyList());

        return UserProfileDto.builder()
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .posts(posts)
                .build();
    }

    public List<UserResponseDto> getFollowers(Long userId) {
        List<User> followers = userRepository.findFollowers(userId);
        return followers.stream()
                .map(this::mapToUserResponseDto)
                .collect(Collectors.toList());
    }

    public List<UserResponseDto> getFollowing(Long userId) {
        List<User> following = userRepository.findFollowing(userId);
        return following.stream()
                .map(this::mapToUserResponseDto)
                .collect(Collectors.toList());
    }

    public boolean followUser(Long userId, Long followedUserId) {
        Optional<User> user = userRepository.findById(userId);
        Optional<User> followedUser = userRepository.findById(followedUserId);

        if (user.isEmpty() || followedUser.isEmpty() || user.get().getFollowing().contains(followedUser.get()))
            return false;

        user.get().getFollowing().add(followedUser.get()); // Add followed user to the following list of the user
        followedUser.get().getFollowers().add(user.get()); // Add the user to the followers list of the followed user
        userRepository.save(user.get());
        userRepository.save(followedUser.get());

        return true;
    }

    public List<UserLikesDto> getLikesUsersInfo(List<Long> ids) {
        List<User> users = userRepository.findAllById(ids);
        return users.stream()
                .map(user -> UserLikesDto.builder()
                        .userId(user.getUserId())
                        .username(user.getUsername())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .build())
                .collect(Collectors.toList());
    }

    private UserResponseDto mapToUserResponseDto(User user) {
        return UserResponseDto.builder()
                .username(user.getUsername())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .role(user.getRole())
                .build();
    }
}
