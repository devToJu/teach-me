package com.github.devtoju.backend.gaptext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
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
        var newCreateDTO = GapTextFactory.ofCreateDTO();
        var newCreateDtoAsJson = mapper.writeValueAsString(newCreateDTO);

        String responseString = mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newCreateDtoAsJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andReturn()
                .getResponse()
                .getContentAsString();

        var actual = mapper.readValue(responseString, GapTextContainer.class);
        var expected = GapTextFactory
                .ofGapTextContainer()
                .copy(actual.id());

        assertEquals(expected, actual);
    }

    @Test
    void addContainer_shouldReturnApiErrorAndStatusIsBadRequest_whenDescriptionIsEmpty() throws Exception {
        var invalidCreateDTO = GapTextFactory.ofCreateDtoWithEmptyDescription();
        var invalidCreateDtoAsJson = mapper.writeValueAsString(invalidCreateDTO);
        var errorMessage = GapTextFactory.getErrorMessageEmptyDescription();

        mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidCreateDtoAsJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.timestamp").isNotEmpty())
                .andExpect(jsonPath("$.messages").value(errorMessage));
    }

    @Test
    void addContainer_shouldReturnApiErrorAndStatusIsBadRequest_whenDescriptionAndGapTextsAreEmpty() throws Exception {
        var invalidCreateDTO = GapTextFactory.ofCreateDtoWhereDescriptionAndGapTextsAreEmpty();
        var invalidCreateDtoAsJson = mapper.writeValueAsString(invalidCreateDTO);

        String[] errorMessages = {
                GapTextFactory.getErrorMessageEmptyGapTexts(),
                GapTextFactory.getErrorMessageEmptyDescription()
        };

        mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidCreateDtoAsJson))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.timestamp").isNotEmpty())
                .andExpect(jsonPath("$.messages", Matchers.containsInAnyOrder(errorMessages)));
    }

    @Test
    void addContainer_shouldContainsDifferentIds_whenCalledTwice() throws Exception {
        var newCreateDTO = GapTextFactory.ofCreateDTO();
        var newCreateDtoAsJson = mapper.writeValueAsString(newCreateDTO);

        var responseBodyOneAsJson = mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newCreateDtoAsJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andReturn()
                .getResponse()
                .getContentAsString();

        var responseBodyTwoAsJson = mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newCreateDtoAsJson))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andReturn()
                .getResponse()
                .getContentAsString();

        var actualOne = mapper.readValue(responseBodyOneAsJson, GapTextContainer.class);
        var actualTwo = mapper.readValue(responseBodyTwoAsJson, GapTextContainer.class);
        assertNotEquals(actualOne.id(), actualTwo.id());
    }
}