package com.github.devtoju.backend.tasks.components;

import com.github.devtoju.backend.common.interfaces.Retrievable;
import com.github.devtoju.backend.common.services.IdService;
import com.github.devtoju.backend.tasks.models.Task;
import com.github.devtoju.backend.tasks.models.TaskCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class TaskCreateDtoToTaskMapper implements Function<TaskCreateDto, Task> {
    private final IdService idService;

    @Override
    public Task apply(TaskCreateDto taskCreateDto) {
        var id = idService.createUniqueId();
        var addedItemsIds = taskCreateDto.addedItems
                .stream()
                .map(Retrievable::id)
                .toList();

        return new Task(
                id,
                taskCreateDto.name,
                taskCreateDto.description,
                taskCreateDto.searchTerms,
                addedItemsIds
        );
    }
}
