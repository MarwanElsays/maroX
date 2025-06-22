package com.marox.comments.service.client.users;

import com.marox.comments.dto.UserInteractionDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@FeignClient(name="users",contextId = "commentsUsersClient", fallback = CommentsUsersFallback.class)
public interface UsersFeignClient {
    @PostMapping(value = "/api/interactedUsers")
    ResponseEntity<List<UserInteractionDto>> getUsersInteractedWithPost(@RequestBody List<Long> ids);

}