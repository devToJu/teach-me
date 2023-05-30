package com.github.devtoju.backend.gaptext.components;

import com.github.devtoju.backend.common.services.IdService;
import com.github.devtoju.backend.gaptext.models.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
@RequiredArgsConstructor
public class CreateDtoToGapTextContainerMapper implements Function<GapTextContainerCreateDTO, GapTextContainer> {
    private final IdService idService;

    @Override
    public GapTextContainer apply(GapTextContainerCreateDTO createDTO) {
        return new GapTextContainer(
                idService.createUniqueId(),
                createDTO.description(),
                createDTO.gapTexts(),
                createDTO.creator());
    }
}
