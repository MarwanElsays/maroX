package com.marox.posts.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "likes")
public class Like {

    @EmbeddedId
    private LikeId id;  // Composite primary key

    @CreationTimestamp
    private LocalDateTime createdAt;
}

