package com.github.devtoju.backend.gaptext.models;

import org.springframework.data.annotation.Id;

import java.util.List;

public record GapTextContainer(
        @Id
        String id,
        String description,
        List<GapText> gapTexts
) {
}
