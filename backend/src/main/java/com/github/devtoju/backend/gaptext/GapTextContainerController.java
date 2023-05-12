package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.exceptions.GapTextContainerIdIsNotValidException;
import com.github.devtoju.backend.gaptext.models.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gaptextcontainer")
@RequiredArgsConstructor
public class GapTextContainerController {
    private final GapTextContainerService gapTextContainerService;

    @GetMapping
    public List<GapTextContainer> getAllContainers() {
        return gapTextContainerService.getAllContainers();
    }

    @GetMapping("/{id}")
    public GapTextContainer getContainerById(@PathVariable String id) {
        if (id.isBlank()) {
            throw new GapTextContainerIdIsNotValidException(id);
        }

        return gapTextContainerService.getContainerById(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public GapTextContainer addContainer(@RequestBody @Valid GapTextContainerCreateDTO newCreateDTO) {
        return gapTextContainerService.addContainer(newCreateDTO);
    }

    @PutMapping("/{id}")
    public GapTextContainer updateContainer(
            @PathVariable String id,
            @RequestBody @Valid GapTextContainerUpdateDTO updateDTO
    ) {
        var idIsInvalid = id.isBlank() || !id.equals(updateDTO.id());
        if (idIsInvalid) {
            throw new GapTextContainerIdIsNotValidException(id, updateDTO.id());
        }

        return gapTextContainerService.updateContainer(updateDTO);
    }
}
