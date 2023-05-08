package com.github.devtoju.backend.gaptext.components;

import com.github.devtoju.backend.common.services.IdService;
import com.github.devtoju.backend.gaptext.GapTextFactory;
import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GapTextContainerMapperTest {

    GapTextContainerMapper gapTextContainerMapper =
            new GapTextContainerMapper(
                    new IdService()
            );

    @Test
    void apply_shouldReturnDifferentIds_whenCalledTwice() {
        var containerWithoutIdDTO = GapTextFactory.createContainerDTO();

        var actualOne = gapTextContainerMapper.apply(containerWithoutIdDTO);
        var actualTwo = gapTextContainerMapper.apply(containerWithoutIdDTO);

        assertInstanceOf(GapTextContainer.class, actualOne);
        assertInstanceOf(GapTextContainer.class, actualTwo);
        assertNotEquals(actualOne.id(), actualTwo.id());
    }
}