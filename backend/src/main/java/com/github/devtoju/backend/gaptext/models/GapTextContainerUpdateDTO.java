package com.github.devtoju.backend.gaptext.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public record GapTextContainerUpdateDTO(
        @NotBlank
        String id,
        @NotBlank
        @Size(max = 255)
        String description,
        @Size(min = 2, max = 6)
        List<GapText> gapTexts,
        @NotBlank
        String creator
) {
}
