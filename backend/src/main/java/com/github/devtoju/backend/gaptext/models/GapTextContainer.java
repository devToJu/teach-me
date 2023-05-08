package com.github.devtoju.backend.gaptext.models;

import jakarta.validation.constraints.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("gapTextContainers")
public record GapTextContainer(
        @Id
        String id,
        @NotBlank
        @Size(max = 255)
        String description,
        @Size(min = 2, max = 6)
        List<GapText> gapTexts
) {
    /**
     * Creates a copy of the current gap text container
     *
     * @param newId The new ID of the copy
     * @return A new instance with the same attributes except for the ID
     */
    public GapTextContainer copy(String newId) {
        return new GapTextContainer(newId, description, gapTexts);
    }
}
