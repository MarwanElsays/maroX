package com.marox.posts.service.client.comments;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Map;

@FeignClient(name="comments", fallback = CommentsFallback.class)
public interface CommentsFeignClient {

    @GetMapping("/api/getCommentsCountByPostId/{postId}")
    public ResponseEntity<Long> getCommentsCountByPostId(@PathVariable Long postId);

    @GetMapping("/api/getCommentsCountForPosts")
    public ResponseEntity<Map<Long, Long>> getCommentsCountForPosts(@RequestBody List<Long> postIds);
}