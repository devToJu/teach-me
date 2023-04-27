package com.github.devtoju.backend.gaptext.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record GapText(
        @NotBlank
        String value,
        @Size(min=1, max=10)
        int rowPosition,
        boolean isGap
) {
}
