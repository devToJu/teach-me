package com.github.devtoju.backend.gaptext.models;

import jakarta.validation.constraints.NotBlank;

public record Text(
        @NotBlank
        String value,
        boolean isGap
) {
}
