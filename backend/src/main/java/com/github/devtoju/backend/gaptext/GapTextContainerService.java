package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.common.services.IdService;
import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GapTextContainerService {
    private final GapTextContainerRepo gapTextContainerRepo;
    private final IdService idService;

    public List<GapTextContainer> getAllContainers() {
        return gapTextContainerRepo.findAll();
    }

    public GapTextContainer addContainer(GapTextContainer newContainer) {
        String newId = idService.createUniqueId();
        return gapTextContainerRepo.save(
                newContainer.getCopy(newId));
    }
}
