package com.marox.posts.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserInteractionDto {

    @NotNull(message = "User id cannot be null")
    private Long userId;

    @NotEmpty(message = "Username cannot be null or empty")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    @NotEmpty(message = "First name cannot be null or empty")
    private String firstName;

    @NotEmpty(message = "Last name cannot be null or empty")
    private String lastName;
}