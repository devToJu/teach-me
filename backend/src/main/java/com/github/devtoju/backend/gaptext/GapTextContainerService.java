package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.components.CreateDtoToGapTextContainerMapper;
import com.github.devtoju.backend.gaptext.models.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GapTextContainerService {
    private final GapTextContainerRepo gapTextContainerRepo;
    private final CreateDtoToGapTextContainerMapper createDtoToGapTextContainerMapper;

    public List<GapTextContainer> getAllContainers() {
        return gapTextContainerRepo.findAll();
    }

    public GapTextContainer addContainer(GapTextContainerCreateDTO newCreateDTO) {
        var newContainer = createDtoToGapTextContainerMapper.apply(newCreateDTO);
        return gapTextContainerRepo.save(newContainer);
    }
}
