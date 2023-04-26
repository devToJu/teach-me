package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GapTextContainerRepo extends MongoRepository<GapTextContainer, String> {
}
