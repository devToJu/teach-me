package com.github.devtoju.backend.gaptext.models;

import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;

public record GapText(
        @Id
        String id,
        @NotBlank
        String value,
        @Min(1)
        @Max(6)
        int rowPosition,
        boolean isGap
) {
}
