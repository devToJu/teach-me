package com.github.devtoju.backend.gaptext;

import com.github.devtoju.backend.gaptext.models.GapText;
import com.github.devtoju.backend.gaptext.models.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class GapTextFactory {

    static String description = "to clean, to ring";
    static String emptyDescription = "";
    static String id = "testId";

    /**
     * Instantiate container with four text items
     *
     * @return A new gap text container
     */
    public static GapTextContainer ofGapTextContainer() {
        return new GapTextContainer(id, description, createTexts());
    }

    /**
     * Instantiate a container with four text items
     *
     * @return A new gap text container create DTO
     */
    public static GapTextContainerCreateDTO ofCreateDTO() {
        return new GapTextContainerCreateDTO(description, createTexts());
    }

    /**
     * Instantiate a container with four text items and an empty description
     *
     * @return A new gap text container create DTO
     */
    public static GapTextContainerCreateDTO ofCreateDtoWithEmptyDescription() {
        return new GapTextContainerCreateDTO(emptyDescription, createTexts());
    }

    /**
     * Instantiate a container with an empty description and
     * an empty list of gap texts
     *
     * @return A new gap text container create DTO
     */
    public static GapTextContainerCreateDTO ofCreateDtoWhereDescriptionAndGapTextsAreEmpty() {
        return new GapTextContainerCreateDTO(emptyDescription, Collections.emptyList());
    }

    /**
     * Creates a error message when the description attribute is not valid
     *
     * @return error message
     */
    public static String getErrorMessageEmptyDescription() {
        return "Violate constraint 'NotBlank' at '" +
                GapTextContainerCreateDTO.class.getSimpleName() +
                ".description': must not be blank";
    }

    /**
     * Creates a error message when the gapTexts attribute is not valid
     *
     * @return error message
     */
    public static String getErrorMessageEmptyGapTexts() {
        return "Violate constraint 'Size' at '" +
                GapTextContainerCreateDTO.class.getSimpleName() +
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
