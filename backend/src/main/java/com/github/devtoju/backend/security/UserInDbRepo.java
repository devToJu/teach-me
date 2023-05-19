package com.github.devtoju.backend.security;

import com.github.devtoju.backend.security.models.UserInDb;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInDbRepo extends MongoRepository<UserInDb, String> {
    Optional<UserInDb> getUserInDbByUsername(String username);
}
