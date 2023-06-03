package com.github.devtoju.backend.tasks.models;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("tasks")
public record Task(
        String id,
        String name,
        String description,
        List<String> searchTerms,
        List<String> addedItemsIds
) implements TaskBase {
}
