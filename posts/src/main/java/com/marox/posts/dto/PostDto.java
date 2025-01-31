package com.marox.posts.dto;

import com.marox.posts.entity.Post;
import jakarta.validation.constraints.*;
import lombok.Data;
@Data
public class PostDto {

    @NotNull(message = "Post ID cannot be null")
    private Long postId;

    @NotEmpty(message = "Title cannot be null or empty")
    @Size(max = 255, message = "Title must be less than 255 characters")
    private String title;

    @NotEmpty(message = "Content cannot be null or empty")
    private String content;

    @NotNull(message = "Author ID cannot be null")
    private Long authorId;

    @NotNull(message = "Status cannot be null")
    private Post.Status status;
}