package com.marox.posts.dto;

import com.marox.posts.enums.PostStatus;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PostRequestDto {

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

    @Transient
    private transient MultipartFile imageFile;
}
