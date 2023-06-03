package com.github.devtoju.backend.tasks;

import com.github.devtoju.backend.tasks.components.TaskCreateDtoToTaskMapper;
import com.github.devtoju.backend.tasks.models.Task;
import com.github.devtoju.backend.tasks.models.TaskCreateDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class TaskService {
    private final TaskRepo taskRepo;
    private final TaskCreateDtoToTaskMapper toTaskMapper;

    public Task create(TaskCreateDto createDto) {
        var newTask = toTaskMapper.apply(createDto);
        return taskRepo.save(newTask);
    }
}
