package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.models.GapTextContainer;
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

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @SuppressWarnings("java:S4684")
    public GapTextContainer addContainer(@RequestBody @Valid GapTextContainer newContainer) {
        return gapTextContainerService.addContainer(newContainer);
    }
}
