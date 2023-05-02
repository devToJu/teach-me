package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.common.services.IdService;
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
    private final IdService idService = mock(IdService.class);

    @BeforeEach
    void init() {
        gapTextContainerService = new GapTextContainerService(
                gapTextContainerRepo,
                idService);
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
        GapTextContainer containerToAdd = GapTextFactory.createContainer();

        when(idService.createUniqueId())
                .thenReturn(containerToAdd.id());
        when(gapTextContainerRepo.save(containerToAdd))
                .thenReturn(containerToAdd);

        GapTextContainer actual = gapTextContainerService.addContainer(containerToAdd);

        verify(idService).createUniqueId();
        verify(gapTextContainerRepo).save(containerToAdd);

        GapTextContainer expected = GapTextFactory.createContainer();
        assertEquals(expected, actual);
    }
}