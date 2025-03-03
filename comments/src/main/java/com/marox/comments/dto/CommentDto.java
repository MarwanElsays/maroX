package com.marox.comments.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentDto {

    @NotNull(message = "Post ID cannot be null")
    private Long commentId;

    @NotNull(message = "Post ID cannot be null")
    private Long postId;

    @NotNull(message = "User ID cannot be null")
    private Long userId;

    @NotEmpty(message = "Content cannot be null or empty")
    private String content;

    private Long parentCommentId;
}
