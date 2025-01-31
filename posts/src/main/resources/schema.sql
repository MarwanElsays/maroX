CREATE TABLE posts (
    postId BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    authorId BIGINT NOT NULL,
    createdAt TIMESTAMP,
    updatedAt TIMESTAMP,
    status VARCHAR(50)
);