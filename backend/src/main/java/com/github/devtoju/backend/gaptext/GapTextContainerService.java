package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GapTextContainerService {
    private final GapTextContainerRepo gapTextContainerRepo;

    public List<GapTextContainer> getAllContainers() {
        return gapTextContainerRepo.findAll();
    }

}
