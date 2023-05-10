package com.github.devtoju.backend.gaptext.components;

import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import com.github.devtoju.backend.gaptext.models.GapTextContainerUpdateDTO;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public class UpdateDtoToGapTextContainerMapper implements Function<GapTextContainerUpdateDTO, GapTextContainer> {

    @Override
    public GapTextContainer apply(GapTextContainerUpdateDTO updateDTO) {
        return new GapTextContainer(
                updateDTO.id(),
                updateDTO.description(),
                updateDTO.gapTexts());
    }
}
