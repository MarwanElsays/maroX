package com.marox.posts.service.client;


import com.marox.posts.dto.UserLikesDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UsersFallback implements UsersFeignClient {
    @Override
    public ResponseEntity<List<UserLikesDto>> getLikesUsersInfo(List<Long> ids) {
        System.out.println("Posts feign client fallback");
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
