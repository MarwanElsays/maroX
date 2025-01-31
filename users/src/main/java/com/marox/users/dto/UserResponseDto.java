package com.marox.users.dto;

import com.marox.users.entity.User;
import jakarta.validation.constraints.*;
import lombok.Data;
@Data
public class UserResponseDto {

    @NotEmpty(message = "Username cannot be null or empty")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    private String username;

    @NotEmpty(message = "Email cannot be null or empty")
    @Email(message = "Email must be valid")
    private String email;

    @NotEmpty(message = "First name cannot be null or empty")
    private String firstName;

    @NotEmpty(message = "Last name cannot be null or empty")
    private String lastName;

    @NotNull(message = "Role cannot be null")
    private User.Role role;
}