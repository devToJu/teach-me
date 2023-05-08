package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.models.GapText;
import com.github.devtoju.backend.gaptext.models.GapTextContainer;

import java.util.Arrays;
import java.util.Collections;

public class GapTextFactory {
    /**
     * Creates a gap text container with four items
     *
     * @return A new instance of a gap text container
     */
    public static GapTextContainer createContainer() {
        var textA = createText("He was", 1);
        var textB = createGap("cleaning", 2);
        var textC = createText("his room, when the telephone", 3);
        var textD = createGap("rangs", 4);

        var id = "testId";
        var description = "to clean, to ring";
        var toAdd = Arrays.asList(textA, textB, textC, textD);

        return new GapTextContainer(id, description, toAdd);
    }

    /**
     * Creates a gap text container with an empty description
     *
     * @return A new instance of a gap text container
     */
    public static GapTextContainer createContainerWithEmptyDescription() {
        var textA = createText("Text", 1);
        var textB = createGap("Gap", 2);

        var id = "testId";
        var description = "";
        var toAdd = Arrays.asList(textA, textB);

        return new GapTextContainer(id, description, toAdd);
    }

    /**
     * Creates a gap text container with an empty description and
     * an empty list of gap texts
     *
     * @return A new instance of a gap text container
     */
    public static GapTextContainer createContainerWhereDescriptionAndGapTextsAreEmpty() {
        return new GapTextContainer("testId", "", Collections.emptyList());
    }

    public static String getErrorMessageEmptyDescription() {
        return "Violate constraint 'NotBlank' at 'gapTextContainer.description': must not be blank";
    }

    public static String getErrorMessageEmptyGapTexts() {
        return "Violate constraint 'Size' at 'gapTextContainer.gapTexts': size must be between 2 and 6";
    }

    private static GapText createText(String value, int pos) {
        return new GapText("id-" + pos, value, pos, false);
    }

    private static GapText createGap(String value, int pos) {
        return new GapText("id-" + pos, value, pos, true);
    }
}
