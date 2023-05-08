package com.github.devtoju.backend.gaptext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class GapTextContainerIntegrationTest {

    private final String apiUrl = "/api/gaptextcontainer";

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper mapper;

    @Test
    void getAllContainers_shouldReturnEmptyList_whenRepoIsEmpty() throws Exception {
        String emptyListAsJson = mapper.writeValueAsString(Collections.<GapTextContainer>emptyList());

        mockMvc.perform(get(apiUrl))
                .andExpect(status().isOk())
                .andExpect(content().json(emptyListAsJson));
    }

    @Test
    void addContainer_shouldReturnAddedContainer() throws Exception {
        GapTextContainer newContainer = GapTextFactory.createContainer();
        String newContainerAsJson = mapper.writeValueAsString(newContainer);

        String responseString = mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newContainerAsJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andReturn()
                .getResponse()
                .getContentAsString();

        GapTextContainer actual = mapper.readValue(responseString, GapTextContainer.class);
        GapTextContainer expected = newContainer.copy(actual.id());
        assertEquals(expected, actual);
    }

    @Test
    void addContainer_shouldReturnApiErrorAndStatusIsBadRequest_whenDescriptionIsEmpty() throws Exception {
        GapTextContainer invalidContainer = GapTextFactory.createContainerWithEmptyDescription();
        String invalidContainerAsJson = mapper.writeValueAsString(invalidContainer);
        String expectedBody = GapTextFactory.getErrorMessageEmptyDescription();

        mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidContainerAsJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.timestamp").isNotEmpty())
                .andExpect(jsonPath("$.messages").value(expectedBody));
    }

    @Test
    void addContainer_shouldReturnApiErrorAndStatusIsBadRequest_whenDescriptionAndGapTextsAreEmpty() throws Exception {
        GapTextContainer invalidContainer = GapTextFactory.createContainerWhereDescriptionAndGapTextsAreEmpty();
        String invalidContainerAsJson = mapper.writeValueAsString(invalidContainer);

        String[] expectedBody = {
                GapTextFactory.getErrorMessageEmptyGapTexts(),
                GapTextFactory.getErrorMessageEmptyDescription()
        };

        mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidContainerAsJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.timestamp").isNotEmpty())
                .andExpect(jsonPath("$.messages", Matchers.containsInAnyOrder(expectedBody)));
    }
}