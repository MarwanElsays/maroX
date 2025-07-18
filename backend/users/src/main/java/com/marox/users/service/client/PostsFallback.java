package com.marox.users.service.client;


import com.marox.users.dto.PostResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PostsFallback implements PostsFeignClient{
    @Override
    public ResponseEntity<List<PostResponseDto>> getPostsByUserId(Long userId) {
        System.out.println("users feign client fallback");
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
