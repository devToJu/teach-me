package com.github.devtoju.backend.tasks.models;

import com.github.devtoju.backend.common.interfaces.Informable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.List;

public class TaskCreateDto implements TaskBase {
    @Size(max = 255)
    public String name;

    @NotBlank
    @Size(max = 255)
    public String description;

    @Size(max = 8)
    public List<String> searchTerms;

    @Size(min  = 1, max = 20)
    public List<Informable> addedItems;
}
