package com.github.devtoju.backend.gaptext;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.devtoju.backend.gaptext.models.GapText;
import com.github.devtoju.backend.gaptext.models.*;
import com.github.devtoju.backend.security.SecurityFactory;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class GapTextFactory {

    private final static ObjectMapper mapper = new ObjectMapper();

    static String description = "to clean, to ring";
    static String emptyDescription = "";
    static String updatedDescription = "updated description";
    static String id = "testId";
    static String creator = SecurityFactory.username;

    /**
     * Instantiate container with four text items
     *
     * @return A new gap text container
     */
    public static GapTextContainer ofGapTextContainer() {
        return new GapTextContainer(id, description, createTexts(), creator);
    }

    /**
     * Instantiate container with four text items, a given id and an updated description
     *
     * @return A new gap text container
     */
    public static GapTextContainer ofGapTextContainerUpdated(String id) {
        return new GapTextContainer(id, updatedDescription, createTexts(), creator);
    }

    /**
     * Instantiate a container with four text items
     *
     * @return A new gap text container create DTO
     */
    public static GapTextContainerCreateDTO ofCreateDTO() {
        return new GapTextContainerCreateDTO(description, createTexts(), creator);
    }

    /**
     * Create a JSON-String of Create DTO
     * @return Create DTO as JSON-String
     * @throws JsonProcessingException when couldn't parse DTO to JSON
     */
    public static String ofCreateDtoAsJson() throws JsonProcessingException {
        var container = ofCreateDTO();
        return mapper.writeValueAsString(container);
    }

    /**
     * Instantiate a corrupt container without creator
     *
     * @return A new gap text container create DTO
     */
    public static GapTextContainerCreateDTO ofInvalidCreateDtoWithoutCreator() {
        return new GapTextContainerCreateDTO(description, createTexts(), "");
    }

    /**
     * Instantiate a container with four text items and an empty description
     *
     * @return A new gap text container create DTO
     */
    public static GapTextContainerCreateDTO ofInvalidCreateDtoWithoutDescription() {
        return new GapTextContainerCreateDTO(emptyDescription, createTexts(), creator);
    }

    /**
     * Instantiate a container with an empty description and
     * an empty list of gap texts
     *
     * @return A new gap text container create DTO
     */
    public static GapTextContainerCreateDTO ofInvalidCreateDtoWithoutDescriptionAndGapTexts() {
        return new GapTextContainerCreateDTO(emptyDescription, Collections.emptyList(), creator);
    }

    /**
     * Instantiate a container with an updated description
     *
     * @return A new gap text container update DTO
     */
    public static GapTextContainerUpdateDTO ofUpdateDTO() {
        return new GapTextContainerUpdateDTO(id, updatedDescription, createTexts(), creator);
    }

    /**
     * Instantiate a container with a given id and an updated description
     *
     * @return A new gap text container update DTO
     */
    public static GapTextContainerUpdateDTO ofUpdateDTO(String id) {
        return new GapTextContainerUpdateDTO(id, updatedDescription, createTexts(), creator);
    }

    /**
     * Instantiate a container with an updated description
     *
     * @return A new gap text container update DTO
     */
    public static GapTextContainerUpdateDTO ofInvalidUpdateDtoWithoutCreator() {
        return new GapTextContainerUpdateDTO(id, updatedDescription, createTexts(), "");
    }

    /**
     * Creates an error message when the description attribute is not valid
     *
     * @return error message
     */
    public static String getErrorMessageEmptyDescription() {
        return "Violate constraint 'NotBlank' at '" +
                GapTextContainerCreateDTO.class.getSimpleName() +
                ".description': must not be blank";
    }

    /**
     * Creates an error message when the gapTexts attribute is not valid
     *
     * @return error message
     */
    public static String getErrorMessageEmptyGapTexts() {
        return "Violate constraint 'Size' at '" +
                GapTextContainerCreateDTO.class.getSimpleName() +
                ".gapTexts': size must be between 2 and 6";
    }

    /**
     * Creates an error message when the creator attribute is not valid
     *
     * @return error message
     */
    public static String getErrorMessageEmptyCreator(ContainerBase container) {
        return "Violate constraint 'NotBlank' at '" +
                container.getClass().getSimpleName() +
                ".creator': must not be blank";
    }

    /**
     * Creates an error message when the gap text id does not exist
     *
     * @return error message
     */
    public static String getErrorMessageIdNotExist() {
        return "Container with ID '" + id + "' does not exist!";
    }

    /**
     * Creates an error message for updating when the gap text id does not exist
     *
     * @return error message
     */
    public static String getErrorMessageIdNotExistUpdate() {
        return "Updating of Gap text container denied: Container with ID '" +
                id + "' does not exist!";
    }

    /**
     * Creates an error message for deleting when the gap text id does not exist
     *
     * @return error message
     */
    public static String getErrorMessageIdNotExistDelete() {
        return "Deleting of Gap text container failed: Container with ID '" +
                id + "' does not exist!";
    }

    /**
     * Creates an error message when the url id is blank
     *
     * @return error message
     */
    public static String[] getErrorMessagesIdIsBlank() {
        return new String[]{
                "Gap text container ID ' ' is invalid!",
                "URL ID: ' '",
                "Container ID: 'testId'"
        };
    }

    /**
     * Creates an error message when the url id and the gap text id are not equals
     *
     * @return error message
     */
    public static String[] getErrorMessagesIdsAreNotEquals() {
        return new String[]{
                "Gap text container ID 'otherId' is invalid!",
                "URL ID: 'otherId'",
                "Container ID: 'testId'"
        };
    }

    /**
     * Creates an error message when the gap text creator does not exist
     *
     * @return error message
     */
    public static String getErrorMessageContainerCreatorNotExist() {
        return "Could not get gap texts containers: Creator '" + creator + "' does not exist!";
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
