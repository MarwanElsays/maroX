package com.marox.posts.service.client;

import com.marox.posts.dto.UserLikesDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@FeignClient(name="users", fallback = UsersFallback.class)
public interface UsersFeignClient {
    @PostMapping(value = "/api/getLikesUsersInfo")
    ResponseEntity<List<UserLikesDto>> getLikesUsersInfo(@RequestBody List<Long> ids);

}