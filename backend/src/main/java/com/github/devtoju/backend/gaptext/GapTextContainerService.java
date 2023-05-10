package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.components.*;
import com.github.devtoju.backend.gaptext.exceptions.GapTextContainerNotExistException;
import com.github.devtoju.backend.gaptext.models.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GapTextContainerService {
    private final GapTextContainerRepo gapTextContainerRepo;
    private final CreateDtoToGapTextContainerMapper createDtoToGapTextContainerMapper;
    private final UpdateDtoToGapTextContainerMapper updateDtoToGapTextContainerMapper;

    public List<GapTextContainer> getAllContainers() {
        return gapTextContainerRepo.findAll();
    }

    public GapTextContainer addContainer(GapTextContainerCreateDTO newCreateDTO) {
        var newContainer = createDtoToGapTextContainerMapper.apply(newCreateDTO);
        return gapTextContainerRepo.save(newContainer);
    }

    public GapTextContainer updateContainer(GapTextContainerUpdateDTO updateDTO) {
        var containerNotExist = !gapTextContainerRepo.existsById(updateDTO.id());
        if (containerNotExist) {
            throw new GapTextContainerNotExistException(updateDTO.id());
        }

        var gapTextContainer = updateDtoToGapTextContainerMapper.apply(updateDTO);
        return gapTextContainerRepo.save(gapTextContainer);
    }
}
