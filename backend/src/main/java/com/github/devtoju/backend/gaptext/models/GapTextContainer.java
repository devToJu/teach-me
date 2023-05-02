package com.github.devtoju.backend.gaptext.models;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;

import java.util.List;

public record GapTextContainer(
        @Id
        String id,
        @NotBlank
        @Size(max = 255)
        String description,
        @Size(min = 2, max=10)
        List<GapText> gapTexts
) {
    /**
     * Creates a copy of the current gap text container
     * @param newId The new ID of the copy
     * @return A new instance with the same attributes except for the ID
     */
    public GapTextContainer copy(String newId) {
        return new GapTextContainer(newId, description, gapTexts);
    }
}
