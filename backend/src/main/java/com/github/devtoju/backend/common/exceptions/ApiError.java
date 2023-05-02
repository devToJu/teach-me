package com.github.devtoju.backend.common.exceptions;

import lombok.Getter;

import java.time.Instant;
import java.util.List;

public class ApiError {
    @Getter
    private final List<String> messages;

    @Getter
    private final Instant timestamp = Instant.now();

    private ApiError(List<String> message) {
        this.messages = message;
    }

    public static ApiError create(List<String> message) {
        return new ApiError(message);
    }
}
