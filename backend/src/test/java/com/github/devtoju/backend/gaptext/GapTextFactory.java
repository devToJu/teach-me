package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.models.GapText;
import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import com.github.devtoju.backend.gaptext.models.GapTextContainerDTO;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class GapTextFactory {

    static String description = "to clean, to ring";
    static String emptyDescription = "";
    static String id = "testId";

    /**
     * Creates a gap text container with four text items
     *
     * @return A new instance of a gap text container
     */
    public static GapTextContainer createContainer() {
        return new GapTextContainer(id, description, createTexts());
    }

    /**
     * Creates a gap text container DTO with four text items
     *
     * @return A new instance of a gap text container DTO
     */
    public static GapTextContainerDTO createContainerDTO() {
        return new GapTextContainerDTO(description, createTexts());
    }

    /**
     * Creates a gap text container DTO with four text items and
     * an empty description
     *
     * @return A new instance of a gap text container DTO
     */
    public static GapTextContainerDTO createContainerDtoWithEmptyDescription() {
        return new GapTextContainerDTO(emptyDescription, createTexts());
    }

    /**
     * Creates a gap text container DTO with an empty description and
     * an empty list of gap texts
     *
     * @return A new instance of a gap text container DTO
     */
    public static GapTextContainerDTO createContainerDtoWhereDescriptionAndGapTextsAreEmpty() {
        return new GapTextContainerDTO(emptyDescription, Collections.emptyList());
    }

    /**
     * Creates a error message when the description attribute is not valid
     *
     * @return error message
     */
    public static String getErrorMessageEmptyDescription() {
        return "Violate constraint 'NotBlank' at '" +
                GapTextContainerDTO.class.getSimpleName() +
                ".description': must not be blank";
    }

    /**
     * Creates a error message when the gapTexts attribute is not valid
     *
     * @return error message
     */
    public static String getErrorMessageEmptyGapTexts() {
        return "Violate constraint 'Size' at '" +
                GapTextContainerDTO.class.getSimpleName() +
                ".gapTexts': size must be between 2 and 6";
    }

    private static List<GapText> createTexts() {
        var textA = createText("He was", 1);
        var textB = createGap("cleaning", 2);
        var textC = createText("his room, when the telephone", 3);
        var textD = createGap("rangs", 4);
        return Arrays.asList(textA, textB, textC, textD);
    }

    private static GapText createText(String value, int pos) {
        return new GapText("id-" + pos, value, pos, false);
    }

    private static GapText createGap(String value, int pos) {
        return new GapText("id-" + pos, value, pos, true);
    }
}
