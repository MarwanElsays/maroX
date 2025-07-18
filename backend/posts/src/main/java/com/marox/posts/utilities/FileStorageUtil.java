package com.marox.posts.utilities;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.Objects;

@Component
public class FileStorageUtil {

    @Value("${post.image.upload-dir}")
    private String uploadDir;

    public String uploadFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            return null;
        }
        System.out.println(uploadDir);

        try {
            Files.createDirectories(Paths.get(uploadDir));

            String originalFileName = Path.of(Objects.requireNonNull(file.getOriginalFilename())).getFileName().toString();
            String uniqueFileName = System.currentTimeMillis() + "_" + originalFileName;

            Path destination = Paths.get(uploadDir).resolve(uniqueFileName);
            Files.copy(file.getInputStream(), destination, StandardCopyOption.REPLACE_EXISTING);

            return uniqueFileName;

        } catch (IOException e) {
            throw new RuntimeException("Failed to store file: " + e.getMessage());
        }
    }

    public Resource loadFile(String filename) {
        Path filePath = Paths.get(uploadDir).resolve(filename);
        if (!Files.exists(filePath)) {
            throw new RuntimeException("File not found: " + filename);
        }
        return new FileSystemResource(filePath.toFile());
    }

    public boolean deleteFile(String filename) {
        try {
            Path filePath = Paths.get(uploadDir).resolve(filename);
            return Files.deleteIfExists(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Could not delete file: " + filename, e);
        }
    }
}
