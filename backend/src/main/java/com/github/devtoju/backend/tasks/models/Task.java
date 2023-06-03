package com.github.devtoju.backend.tasks.models;

import com.github.devtoju.backend.common.interfaces.Informable;

import java.util.List;

public record Task(
        String id,
        String name,
        String description,
        List<String> buzzWords,
        List<Informable> taskItems
) implements TaskBase {
}
