package com.marox.posts.service.client.comments;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;

@Component
public class CommentsFallback implements CommentsFeignClient {

    @Override
    public ResponseEntity<Long> getCommentsCountByPostId(Long postId) {
        System.out.println("Comments feign client fallback");
        return new ResponseEntity<>(null, HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Map<Long, Long>> getCommentsCountForPosts(List<Long> postIds) {
        System.out.println("Comments feign client fallback");
        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
