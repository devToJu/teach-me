package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.models.GapText;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GapTextServiceTest {
    private final GapTextRepo gapTextRepo = mock(GapTextRepo.class);

    @Test
    void getAllTexts_shouldReturnEmptyList_whenRepoIsEmpty() {
        GapTextService gapTextService = new GapTextService(gapTextRepo);

        when(gapTextRepo.findAll())
                .thenReturn(Collections.emptyList());

        List<GapText> actual = gapTextService.getAllTexts();
        verify(gapTextRepo).findAll();

        List<GapText> expected = Collections.emptyList();
        assertEquals(expected, actual);
    }
}