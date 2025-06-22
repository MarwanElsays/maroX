package com.marox.comments.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentWithUserInfoDto {
    private CommentDto comment;
    private UserInteractionDto user;
}