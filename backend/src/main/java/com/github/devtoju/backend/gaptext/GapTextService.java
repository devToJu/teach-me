package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.models.GapText;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class GapTextService {
    private final GapTextRepo gapTextRepo;

    public List<GapText> getAllTexts() {
        return gapTextRepo.findAll();
    }
}
