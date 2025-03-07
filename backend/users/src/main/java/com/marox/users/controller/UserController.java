package com.marox.users.controller;

import com.marox.users.dto.*;
import com.marox.users.service.UserService;
import io.github.resilience4j.retry.annotation.Retry;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Validated
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private AccountsContactInfoDto accountsContactInfoDto;

    @PostMapping("/createUser")
    public ResponseEntity<Long> createUser(@Valid @RequestBody UserRequestDto userRequestDto) {
        Long createdUserId = userService.createUser(userRequestDto);
        return new ResponseEntity<>(createdUserId, HttpStatus.CREATED);
    }

    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        List<UserResponseDto> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("getUser/{userId}")
    public ResponseEntity<UserResponseDto> getUserById(@PathVariable Long userId) {
        UserResponseDto userResponseDto = userService.getUserById(userId);
        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }

    @GetMapping("getUserByEmail/{userId}")
    public ResponseEntity<UserResponseDto> getUserByEmail(@PathVariable @Email(message = "Invalid email format")
                                                              String Email) {
        UserResponseDto userResponseDto = userService.getUserByEmail(Email);
        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }

    @GetMapping("getUserByUserName/{userId}")
    public ResponseEntity<UserResponseDto> getUserByUserName(@PathVariable String userName) {
        UserResponseDto userResponseDto = userService.getUserByUserName(userName);
        return new ResponseEntity<>(userResponseDto, HttpStatus.OK);
    }

    @PutMapping("updateUser/{userId}")
    public ResponseEntity<UserRequestDto> updateUser(@Valid @RequestBody UserRequestDto userRequestDto) {
        userService.updateUser(userRequestDto);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @DeleteMapping("deleteUser/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("getUserProfile/{userId}")
    public ResponseEntity<UserProfileDto> getUserProfile(@PathVariable Long userId) {
        UserProfileDto userProfileDto = userService.getUserProfile(userId);
        return new ResponseEntity<>(userProfileDto, HttpStatus.OK);
    }

    @GetMapping("/getFollowers/{userId}")
    public ResponseEntity<List<UserResponseDto>> getFollowers(@PathVariable Long userId) {
        List<UserResponseDto> followers = userService.getFollowers(userId);
        return new ResponseEntity<>(followers, HttpStatus.OK);
    }

    @GetMapping("/getFollowing/{userId}")
    public ResponseEntity<List<UserResponseDto>> getFollowing(@PathVariable Long userId) {
        List<UserResponseDto> following = userService.getFollowing(userId);
        return new ResponseEntity<>(following, HttpStatus.OK);
    }

    @PostMapping("/followUser")
    public ResponseEntity<String> followUser(@RequestParam Long userId, @RequestParam Long followedUserId) {
        boolean isFollowed = userService.followUser(userId, followedUserId);
        if (isFollowed) {
            return new ResponseEntity<>("User followed successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User already followed or invalid user", HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/unfollowUser")
    public ResponseEntity<String> unfollowUser(@RequestParam Long userId, @RequestParam Long unfollowedUserId) {
        boolean isUnfollowed = userService.unfollowUser(userId, unfollowedUserId);
        if (isUnfollowed) {
            return new ResponseEntity<>("User unfollowed successfully", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("User not followed or invalid user", HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/getLikesUsersInfo")
    public ResponseEntity<List<UserInteractionDto>> getLikesUsersInfo(@RequestBody List<Long> ids) {
        List<UserInteractionDto> usersLikesInfo = userService.getLikesUsersInfo(ids);
        return new ResponseEntity<>(usersLikesInfo, HttpStatus.OK);
    }

    @Retry(name= "getContactInfo", fallbackMethod = "getContactInfoFallback")
    @GetMapping("/getContactInfo")
    public ResponseEntity<AccountsContactInfoDto> getContactInfo() {
        System.out.println("ana done");
        //throw new TimeoutException();
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(accountsContactInfoDto);
    }
    public ResponseEntity<AccountsContactInfoDto> getContactInfoFallback(Throwable throwable) {
        accountsContactInfoDto.setMessage("Service Unavailable");
        return ResponseEntity
                .status(HttpStatus.OK)
                .body(accountsContactInfoDto);
    }
}