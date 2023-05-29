package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.components.*;
import com.github.devtoju.backend.gaptext.exceptions.*;
import com.github.devtoju.backend.gaptext.models.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GapTextContainerService {
    private final GapTextContainerRepo gapTextContainerRepo;
    private final CreateDtoToGapTextContainerMapper createDtoToGapTextContainerMapper;
    private final UpdateDtoToGapTextContainerMapper updateDtoToGapTextContainerMapper;

    public List<GapTextContainer> getAllContainers(String creator) {
        return gapTextContainerRepo
                .getGapTextContainersByCreator(creator)
                .orElse(Collections.emptyList());
    }

    public GapTextContainer getContainerById(String id) {
        return gapTextContainerRepo
                .getById(id)
                .orElseThrow(() -> GapTextContainerNotExistException.of(id));
    }

    public GapTextContainer addContainer(GapTextContainerCreateDTO newCreateDTO) {
        var newContainer = createDtoToGapTextContainerMapper.apply(newCreateDTO);
        return gapTextContainerRepo.save(newContainer);
    }

    public GapTextContainer updateContainer(GapTextContainerUpdateDTO updateDTO) {
        var containerNotExist = !gapTextContainerRepo.existsById(updateDTO.id());
        if (containerNotExist) {
            throw GapTextContainerNotExistException.ofUpdate(updateDTO.id());
        }

        var gapTextContainer = updateDtoToGapTextContainerMapper.apply(updateDTO);
        return gapTextContainerRepo.save(gapTextContainer);
    }

    public void deleteContainer(String id) {
        var containerNotExist = !gapTextContainerRepo.existsById(id);
        if (containerNotExist) {
            throw GapTextContainerNotExistException.ofDelete(id);
        }

        gapTextContainerRepo.deleteById(id);
    }
}
