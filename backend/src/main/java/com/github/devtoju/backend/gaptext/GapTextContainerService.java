package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.components.GapTextContainerMapper;
import com.github.devtoju.backend.gaptext.models.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GapTextContainerService {
    private final GapTextContainerRepo gapTextContainerRepo;
    private final GapTextContainerMapper gapTextContainerMapper;

    public List<GapTextContainer> getAllContainers() {
        return gapTextContainerRepo.findAll();
    }

    public GapTextContainer addContainer(GapTextContainerDTO newContainerDTO) {
        var newContainer = gapTextContainerMapper.apply(newContainerDTO);
        return gapTextContainerRepo.save(newContainer);
    }
}
