package com.marox.posts.service.client.users;


import com.marox.posts.dto.UserInteractionDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostsUsersFallback implements UsersFeignClient {
    @Override
    public ResponseEntity<List<UserInteractionDto>> getUsersInteractedWithPost(List<Long> ids) {
        System.out.println("Users feign client in posts fallback");
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<List<UserInteractionDto>> getUsersInfo(List<Long> ids) {
        System.out.println("Users feign client in posts fallback [getUsersInfo] function");
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
