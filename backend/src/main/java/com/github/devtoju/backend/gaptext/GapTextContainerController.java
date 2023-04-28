package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.models.GapTextContainer;
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
    public GapTextContainer addContainer(@RequestBody GapTextContainer newContainer) {
        return gapTextContainerService.addContainer(newContainer);
    }
}
