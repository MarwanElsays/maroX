package com.marox.posts.service.client;

import com.marox.posts.dto.UserInteractionDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@FeignClient(name="users", fallback = UsersFallback.class)
public interface UsersFeignClient {
    @PostMapping(value = "/api/getLikesUsersInfo")
    ResponseEntity<List<UserInteractionDto>> getLikesUsersInfo(@RequestBody List<Long> ids);

}