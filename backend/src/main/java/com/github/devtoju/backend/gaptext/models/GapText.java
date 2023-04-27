package com.github.devtoju.backend.gaptext.models;

import jakarta.validation.constraints.*;

public record GapText(
        @NotBlank
        String value,
        @Min(1)
        @Max(10)
        int rowPosition,
        boolean isGap
) {
}
