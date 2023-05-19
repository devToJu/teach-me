package com.github.devtoju.backend.security.models;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public record UserInDb(
        @Id
        String username,
        @NotBlank
        String password
) {
}
