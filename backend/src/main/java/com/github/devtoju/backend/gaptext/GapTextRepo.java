package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.models.GapText;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GapTextRepo extends MongoRepository<GapText, String> {
}
