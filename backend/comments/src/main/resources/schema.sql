CREATE TABLE comments (
    commentId BIGINT AUTO_INCREMENT PRIMARY KEY,
    postId BIGINT NOT NULL,
    userId BIGINT NOT NULL,
    content TEXT NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    parentCommentId BIGINT
);