package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.models.GapText;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/gaptext")
@RequiredArgsConstructor
public class GapTextController {
    private final GapTextService gapTextService;

    @GetMapping
    public List<GapText> getAllTexts() {
        return gapTextService.getAllTexts();
    }
}
