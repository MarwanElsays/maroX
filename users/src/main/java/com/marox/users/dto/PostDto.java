package com.marox.users.dto;

import com.marox.users.enums.PostStatus;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
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
    private PostStatus status;
}