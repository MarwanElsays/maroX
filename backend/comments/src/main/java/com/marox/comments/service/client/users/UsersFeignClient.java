package com.marox.comments.service.client.users;

import com.marox.comments.dto.UserInteractionDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@FeignClient(name="users", fallback = UsersFallback.class)
public interface UsersFeignClient {
    @GetMapping(value = "/api/interactedUsers")
    ResponseEntity<List<UserInteractionDto>> getUsersInteractedWithPost(@RequestBody List<Long> ids);

}