package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.common.services.IdService;
import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GapTextContainerServiceTest {
    private final GapTextContainerRepo gapTextContainerRepo = mock(GapTextContainerRepo.class);
    private final IdService idService = mock(IdService.class);

    @Test
    void getAllTexts_shouldReturnEmptyList_whenRepoIsEmpty() {
        GapTextContainerService gapTextContainerService = new GapTextContainerService(gapTextContainerRepo, idService);

        when(gapTextContainerRepo.findAll())
                .thenReturn(Collections.emptyList());

        List<GapTextContainer> actual = gapTextContainerService.getAllContainers();
        verify(gapTextContainerRepo).findAll();

        List<GapTextContainer> expected = Collections.emptyList();
        assertEquals(expected, actual);
    }
}