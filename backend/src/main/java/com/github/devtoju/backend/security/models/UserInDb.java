package com.github.devtoju.backend.security.models;

import jakarta.validation.constraints.NotBlank;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("users")
public record UserInDb(
        String Id,
        @NotBlank
        @Indexed(unique = true)
        String username,
        @NotBlank
        String password
) {
}
