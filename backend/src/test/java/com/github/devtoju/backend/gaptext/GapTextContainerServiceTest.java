package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.components.GapTextContainerMapper;
import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GapTextContainerServiceTest {
    GapTextContainerService gapTextContainerService;
    private final GapTextContainerRepo gapTextContainerRepo = mock(GapTextContainerRepo.class);
    private final GapTextContainerMapper gapTextContainerMapper = mock(GapTextContainerMapper.class);

    @BeforeEach
    void init() {
        gapTextContainerService = new GapTextContainerService(
                gapTextContainerRepo,
                gapTextContainerMapper
        );
    }

    @Test
    void getAllTexts_shouldReturnEmptyList_whenRepoIsEmpty() {
        when(gapTextContainerRepo.findAll())
                .thenReturn(Collections.emptyList());

        List<GapTextContainer> actual = gapTextContainerService.getAllContainers();
        verify(gapTextContainerRepo).findAll();

        List<GapTextContainer> expected = Collections.emptyList();
        assertEquals(expected, actual);
    }

    @Test
    void addContainer_shouldReturnAddedContainer() {
        var newContainer = GapTextFactory.createContainer();
        var newContainerDTO = GapTextFactory.createContainerDTO();
        var expected = GapTextFactory.createContainer();

        when(gapTextContainerMapper.apply(newContainerDTO))
                .thenReturn(newContainer);
        when(gapTextContainerRepo.save(newContainer))
                .thenReturn(newContainer);

        var actual = gapTextContainerService.addContainer(newContainerDTO);

        verify(gapTextContainerMapper).apply(newContainerDTO);
        verify(gapTextContainerRepo).save(newContainer);
        assertEquals(expected, actual);
    }
}