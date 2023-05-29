package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface GapTextContainerRepo extends MongoRepository<GapTextContainer, String> {
    Optional<GapTextContainer> getById(String id);

    Optional<List<GapTextContainer>> getGapTextContainersByCreator(String creator);
}
