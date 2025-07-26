package com.marox.posts.service.client.users;

import com.marox.posts.dto.UserInteractionDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@FeignClient(name="users",contextId = "postsUsersClient", fallback = PostsUsersFallback.class)
public interface UsersFeignClient {
    @PostMapping(value = "/api/interactedUsers")
    ResponseEntity<List<UserInteractionDto>> getUsersInteractedWithPost(@RequestBody List<Long> ids);

    @PostMapping(value = "/api/usersInfo")
    public ResponseEntity<List<UserInteractionDto>> getUsersInfo(@RequestBody List<Long> ids);

}