package com.marox.users.service.client;

import com.marox.users.dto.PostDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@FeignClient(name="posts", fallback = PostsFallback.class)
public interface PostsFeignClient {

    @GetMapping(value = "/api/getPostsByUserId/{userId}")
    ResponseEntity<List<PostDto>> getPostsByUserId(@PathVariable Long userId);

}