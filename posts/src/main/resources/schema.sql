CREATE TABLE posts (
    postId BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    authorId BIGINT NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    status VARCHAR(50)
);

CREATE TABLE likes (
    user_id BIGINT NOT NULL,  -- User who liked the post
    post_id BIGINT NOT NULL,  -- The post that was liked
    createdAt TIMESTAMP,
    PRIMARY KEY (user_id, post_id),  -- Composite key using userId and postId
    FOREIGN KEY (post_id) REFERENCES posts(postId) ON DELETE CASCADE
);