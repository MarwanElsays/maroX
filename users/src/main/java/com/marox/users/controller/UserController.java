package com.marox.users.controller;

import com.marox.users.dto.AccountsContactInfoDto;
import com.marox.users.dto.UserProfileDto;
import com.marox.users.dto.UserRequestDto;
import com.marox.users.dto.UserResponseDto;
import com.marox.users.service.UserService;
import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.retry.annotation.Retry;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.TimeoutException;

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