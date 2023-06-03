package com.github.devtoju.backend.tasks;

import com.github.devtoju.backend.tasks.models.Task;
import com.github.devtoju.backend.tasks.models.TaskCreateDto;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController("/api/task")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public Task create(@RequestBody @Valid TaskCreateDto createDto) {
        return taskService.create(createDto);
    }
}
