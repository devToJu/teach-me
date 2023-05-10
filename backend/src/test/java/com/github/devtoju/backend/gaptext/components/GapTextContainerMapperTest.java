package com.github.devtoju.backend.gaptext.components;

import com.github.devtoju.backend.common.services.IdService;
import com.github.devtoju.backend.gaptext.GapTextFactory;
import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GapTextContainerMapperTest {

    CreateDtoToGapTextContainerMapper createDtoToGapTextContainerMapper =
            new CreateDtoToGapTextContainerMapper(
                    new IdService()
            );

    @Test
    void apply_shouldReturnDifferentIds_whenCalledTwice() {
        var createDTO = GapTextFactory.ofCreateDTO();

        var actualOne = createDtoToGapTextContainerMapper.apply(createDTO);
        var actualTwo = createDtoToGapTextContainerMapper.apply(createDTO);

        assertInstanceOf(GapTextContainer.class, actualOne);
        assertInstanceOf(GapTextContainer.class, actualTwo);
        assertFalse(actualOne.id().isEmpty());
        assertFalse(actualTwo.id().isEmpty());
        assertNotEquals(actualOne.id(), actualTwo.id());
    }
}