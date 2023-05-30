package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.components.*;
import com.github.devtoju.backend.gaptext.exceptions.*;
import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import com.github.devtoju.backend.security.SecurityFactory;
import com.github.devtoju.backend.security.UserInDbRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;
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
    void getAllContainers_shouldReturnApiErrorAndStatus404_whenCreatorIsNotInDb() {
        var creator = GapTextFactory.creator;

        when(userInDbRepo.getUserInDbByUsername(creator))
                .thenReturn(Optional.empty());

        var exception = assertThrows(
                GapTextContainerCreatorNotExistException.class,
                () -> gapTextContainerService.getAllContainers(creator)
        );

        verify(userInDbRepo).getUserInDbByUsername(creator);

        var actualErrorMsg = exception.getMessage();
        var expectedErrorMsg = GapTextFactory.getErrorMessageContainerCreatorNotExist();
        assertEquals(expectedErrorMsg, actualErrorMsg);
    }


    @Test
    void getAllContainers_shouldReturnEmptyList_whenRepoIsEmpty() {
        var creator = GapTextFactory.creator;
        var dbUserAsOptional = SecurityFactory.ofUserInDbAsOptional();

        when(userInDbRepo.getUserInDbByUsername(creator))
                .thenReturn(dbUserAsOptional);
        when(gapTextContainerRepo.getGapTextContainersByCreator(creator))
                .thenReturn(Optional.of(Collections.emptyList()));

        var actualContainers = gapTextContainerService.getAllContainers(creator);

        verify(userInDbRepo).getUserInDbByUsername(creator);
        verify(gapTextContainerRepo).getGapTextContainersByCreator(creator);
        
        var expectedContainers = Collections.emptyList();
        assertEquals(expectedContainers, actualContainers);
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