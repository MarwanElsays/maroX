package com.marox.comments.service.client.users;


import com.marox.comments.dto.UserInteractionDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CommentsUsersFallback implements UsersFeignClient {
    @Override
    public ResponseEntity<List<UserInteractionDto>> getUsersInteractedWithPost(List<Long> ids) {
        System.out.println("Users feign client in comments fallback");
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
