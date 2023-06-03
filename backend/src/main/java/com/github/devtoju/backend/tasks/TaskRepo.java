package com.github.devtoju.backend.tasks;

import com.github.devtoju.backend.tasks.models.Task;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TaskRepo extends MongoRepository<Task, String> {
}
