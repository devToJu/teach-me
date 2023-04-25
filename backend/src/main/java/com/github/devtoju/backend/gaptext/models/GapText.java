package com.github.devtoju.backend.gaptext.models;

import org.springframework.data.annotation.Id;

import java.util.List;

public record GapText(
        @Id
        String id,
        String description,
        List<Text> texts
) {
}
