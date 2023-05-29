package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.components.CreateDtoToGapTextContainerMapper;
import com.github.devtoju.backend.gaptext.components.UpdateDtoToGapTextContainerMapper;
import com.github.devtoju.backend.gaptext.exceptions.GapTextContainerNotExistException;
import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import com.github.devtoju.backend.security.UserInDbRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class GapTextContainerServiceTest {
    GapTextContainerService gapTextContainerService;
    private final GapTextContainerRepo gapTextContainerRepo = mock(GapTextContainerRepo.class);
    private final UserInDbRepo userInDbRepo = mock(UserInDbRepo.class);
    private final CreateDtoToGapTextContainerMapper createDtoToGapTextContainerMapper =
            mock(CreateDtoToGapTextContainerMapper.class);
    private final UpdateDtoToGapTextContainerMapper updateDtoToGapTextContainerMapper =
            mock(UpdateDtoToGapTextContainerMapper.class);

    @BeforeEach
    void init() {
        gapTextContainerService = new GapTextContainerService(
                gapTextContainerRepo,
                userInDbRepo,
                createDtoToGapTextContainerMapper,
                updateDtoToGapTextContainerMapper
        );
    }

    @Test
    void getAllTexts_shouldReturnEmptyList_whenRepoIsEmpty() {
        when(gapTextContainerRepo.findAll())
                .thenReturn(Collections.emptyList());

        List<GapTextContainer> actual = gapTextContainerService
                .getAllContainers(GapTextFactory.creator);

        verify(gapTextContainerRepo).findAll();

        List<GapTextContainer> expected = Collections.emptyList();
        assertEquals(expected, actual);
    }

    @Test
    void addContainer_shouldReturnAddedContainer() {
        var newContainer = GapTextFactory.ofGapTextContainer();
        var newCreateDTO = GapTextFactory.ofCreateDTO();
        var expected = GapTextFactory.ofGapTextContainer();

        when(createDtoToGapTextContainerMapper.apply(newCreateDTO))
                .thenReturn(newContainer);
        when(gapTextContainerRepo.save(newContainer))
                .thenReturn(newContainer);

        var actual = gapTextContainerService.addContainer(newCreateDTO);

        verify(createDtoToGapTextContainerMapper).apply(newCreateDTO);
        verify(gapTextContainerRepo).save(newContainer);
        assertEquals(expected, actual);
    }

    @Test
    void updateContainer_shouldReturnUpdatedContainer() {
        var updateDto = GapTextFactory.ofUpdateDTO();
        var updateContainer = GapTextFactory.ofGapTextContainer();
        var expected = GapTextFactory.ofGapTextContainer();

        when(gapTextContainerRepo.existsById(updateDto.id()))
                .thenReturn(true);
        when(updateDtoToGapTextContainerMapper.apply(updateDto))
                .thenReturn(updateContainer);
        when(gapTextContainerRepo.save(updateContainer))
                .thenReturn(updateContainer);

        var actual = gapTextContainerService.updateContainer(updateDto);

        verify(gapTextContainerRepo).existsById(updateDto.id());
        verify(updateDtoToGapTextContainerMapper).apply(updateDto);
        verify(gapTextContainerRepo).save(updateContainer);
        assertEquals(expected, actual);
    }

    @Test
    void updateContainer_shouldThrowException_whenContainerDoesNotExist() {
        var updateDto = GapTextFactory.ofUpdateDTO();
        var expected = GapTextFactory.getErrorMessageIdNotExistUpdate();

        when(gapTextContainerRepo.existsById(updateDto.id()))
                .thenReturn(false);

        var exception = assertThrows(
                GapTextContainerNotExistException.class,
                () -> gapTextContainerService.updateContainer(updateDto)
        );

        verify(gapTextContainerRepo).existsById(updateDto.id());

        var actual = exception.getMessage();
        assertEquals(expected, actual);
    }

    @Test
    void getContainerById_shouldReturnRequestedContainer() {
        var requestedContainer = GapTextFactory.ofGapTextContainer();
        var containerOptional = Optional.of(requestedContainer);
        var requestedId = requestedContainer.id();
        var expectedContainer = GapTextFactory.ofGapTextContainer();

        when(gapTextContainerRepo.getById(requestedId))
                .thenReturn(containerOptional);

        var actualContainer = gapTextContainerService.getContainerById(requestedId);

        verify(gapTextContainerRepo).getById(requestedId);
        assertEquals(expectedContainer, actualContainer);
    }

    @Test
    void getContainerById_shouldThrowException_whenRequestedIdNotExist() {
        Optional<GapTextContainer> emptyOptional = Optional.empty();
        var requestedId = GapTextFactory.ofGapTextContainer().id();
        var expectedErrorMessage = GapTextFactory.getErrorMessageIdNotExist();

        when(gapTextContainerRepo.getById(requestedId))
                .thenReturn(emptyOptional);

        var actualErrorMessage = assertThrows(
                GapTextContainerNotExistException.class,
                () -> gapTextContainerService.getContainerById(requestedId)
        ).getMessage();

        verify(gapTextContainerRepo).getById(requestedId);
        assertEquals(expectedErrorMessage, actualErrorMessage);
    }

    @Test
    void deleteContainer_whenIdExist() {
        var containerToDelete = GapTextFactory.ofGapTextContainer();
        var idToDelete = containerToDelete.id();

        when(gapTextContainerRepo.existsById(idToDelete))
                .thenReturn(true);

        gapTextContainerService.deleteContainer(idToDelete);

        verify(gapTextContainerRepo).existsById(idToDelete);
        verify(gapTextContainerRepo).deleteById(idToDelete);
    }

    @Test
    void deleteContainer_shouldThrowException_whenIdDoesNotExist() {
        var containerToDelete = GapTextFactory.ofGapTextContainer();
        var idToDelete = containerToDelete.id();
        var expectedErrorMessage = GapTextFactory.getErrorMessageIdNotExistDelete();

        when(gapTextContainerRepo.existsById(idToDelete))
                .thenReturn(false);

        var actualErrorMessage = assertThrows(
                GapTextContainerNotExistException.class,
                () -> gapTextContainerService.deleteContainer(idToDelete)
        ).getMessage();

        verify(gapTextContainerRepo).existsById(idToDelete);
        verify(gapTextContainerRepo, never()).getById(idToDelete);
        assertEquals(expectedErrorMessage, actualErrorMessage);
    }
}