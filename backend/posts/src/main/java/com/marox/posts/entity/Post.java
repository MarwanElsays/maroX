package com.marox.posts.entity;

import com.marox.posts.enums.PostStatus;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long postId;

    private String title;

    @Column(columnDefinition = "TEXT")
    private String content;

    private Long authorId;

    @CreationTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Enumerated(EnumType.STRING)
    private PostStatus status;

    @OneToMany(mappedBy = "id.post", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Like> likes;
}