package com.github.devtoju.backend.tasks.components;

import com.github.devtoju.backend.common.interfaces.Informable;
import com.github.devtoju.backend.common.services.IdService;
import com.github.devtoju.backend.tasks.models.Task;
import com.github.devtoju.backend.tasks.models.TaskCreateDto;
import lombok.RequiredArgsConstructor;

import java.util.function.Function;

@RequiredArgsConstructor
public class TaskCreateDtoToTaskMapper implements Function<TaskCreateDto, Task> {
    private final IdService idService;

    @Override
    public Task apply(TaskCreateDto taskCreateDto) {
        var addedItemsIds = taskCreateDto.addedItems
                .stream()
                .map(Informable::id)
                .toList();

        return new Task(
                idService.createUniqueId(),
                taskCreateDto.name,
                taskCreateDto.description,
                taskCreateDto.searchTerms,
                addedItemsIds
        );
    }
}
