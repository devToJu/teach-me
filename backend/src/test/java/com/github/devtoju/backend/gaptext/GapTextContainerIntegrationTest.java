package com.github.devtoju.backend.gaptext;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.devtoju.backend.gaptext.models.GapTextContainer;
import com.github.devtoju.backend.security.SecurityFactory;
import com.github.devtoju.backend.security.UserInDbRepo;
import com.github.devtoju.backend.security.jwt.JwtService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
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

    @Autowired
    UserInDbRepo repo;

    @Autowired
    JwtService jwtService;

    @Test
    void getAllContainers_shouldReturnStatus403_whenNotLoggedIn() throws Exception {
        mockMvc.perform(get(apiUrl))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser()
    void getAllContainers_shouldReturnEmptyList_whenRepoIsEmpty() throws Exception {
        var emptyListAsJson = mapper.writeValueAsString(Collections.<GapTextContainer>emptyList());
        var userToAdd = SecurityFactory.ofUserInDb();
        repo.save(userToAdd);

        mockMvc.perform(get(apiUrl)
                        .content(userToAdd.username()))
                .andExpect(status().isOk())
                .andExpect(content().json(emptyListAsJson));
    }

    @Test
    void getAllContainers_shouldReturnEmptyList_whenJwtTokenIsValid() throws Exception {
        var userToAdd = SecurityFactory.ofUserInDb();
        repo.save(userToAdd);

        var loginDataAsJson = SecurityFactory.ofLoginDataAsJson();
        var token = mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginDataAsJson))
                .andExpect(status().isOk())
                .andReturn()
                .getResponse()
                .getContentAsString();

        var claims = jwtService.validateToken(token);
        var actualUsername = claims.getSubject();
        var expectedUsername = userToAdd.username();
        assertEquals(expectedUsername, actualUsername);

        mockMvc.perform(get(apiUrl)
                        .content(actualUsername)
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json("[]"));
    }

    @Test
    void addContainer_shouldReturn403_whenNotLoggedIn() throws Exception {
        var newCreateDTO = GapTextFactory.ofCreateDTO();
        var newCreateDtoAsJson = mapper.writeValueAsString(newCreateDTO);

        mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newCreateDtoAsJson))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser
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
    @WithMockUser
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
    @WithMockUser
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
    @WithMockUser
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

    @Test
    void getContainerById_shouldReturnStatus403_whenNotLoggedIn() throws Exception {
        var newCreateDTO = GapTextFactory.ofCreateDTO();
        var newCreateDtoAsJson = mapper.writeValueAsString(newCreateDTO);

        mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newCreateDtoAsJson))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser
    void getContainerById_shouldReturnContainer_whenIdExist() throws Exception {
        var newCreateDTO = GapTextFactory.ofCreateDTO();
        var newCreateDtoAsJson = mapper.writeValueAsString(newCreateDTO);

        var addedContainerAsJson = mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newCreateDtoAsJson))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        var addedContainer = mapper.readValue(addedContainerAsJson, GapTextContainer.class);
        var idToGet = addedContainer.id();
        var url = apiUrl + "/" + idToGet;

        mockMvc.perform(get(url))
                .andExpect(status().isOk())
                .andExpect(content().json(addedContainerAsJson));
    }

    @Test
    @WithMockUser
    void getContainerById_shouldReturnApiErrorAndStatus404_whenIdNotExist() throws Exception {
        var expectedErrorMessage = GapTextFactory.getErrorMessageIdNotExist();
        var idToGet = GapTextFactory.id;
        var url = apiUrl + "/" + idToGet;

        mockMvc.perform(get(url))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.messages").value(expectedErrorMessage));
    }

    @Test
    void updateContainer_shouldReturnStatus403_whenNotLoggedIn() throws Exception {
        var createDTO = GapTextFactory.ofCreateDTO();
        var createDtoAsJson = mapper.writeValueAsString(createDTO);

        mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createDtoAsJson))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser
    void updateContainer_shouldReturnUpdatedContainer() throws Exception {
        var createDTO = GapTextFactory.ofCreateDTO();
        var createDtoAsJson = mapper.writeValueAsString(createDTO);

        var responseBodyAsJson = mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createDtoAsJson))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        var addedId = mapper.readValue(responseBodyAsJson, GapTextContainer.class).id();
        var expectedContainer = GapTextFactory.ofGapTextContainerUpdated(addedId);
        var expectedContainerAsJson = mapper.writeValueAsString(expectedContainer);

        var updateDTO = GapTextFactory.ofUpdateDTO(addedId);
        var updateDtoAsJson = mapper.writeValueAsString(updateDTO);
        var urlId = "/" + updateDTO.id();

        mockMvc.perform(put(apiUrl + urlId, updateDTO)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateDtoAsJson))
                .andExpect(status().isOk())
                .andExpect(content().json(expectedContainerAsJson));
    }

    @Test
    @WithMockUser
    void updateContainer_shouldReturnApiErrorAndStatus422_whenUrlIdIsBlank() throws Exception {
        var updateDTO = GapTextFactory.ofUpdateDTO();
        var updateDtoAsJson = mapper.writeValueAsString(updateDTO);
        var errorMessages = GapTextFactory.getErrorMessagesIdIsBlank();
        var invalidUrlId = "/ ";

        mockMvc.perform(put(apiUrl + invalidUrlId, updateDTO)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateDtoAsJson))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.messages", Matchers.containsInAnyOrder(errorMessages)));
    }

    @Test
    @WithMockUser
    void updateContainer_shouldReturnApiErrorAndStatus422_whenUrlIdAndContainerIdAreNotEqual() throws Exception {
        var updateDTO = GapTextFactory.ofUpdateDTO();
        var updateDtoAsJson = mapper.writeValueAsString(updateDTO);
        var errorMessages = GapTextFactory.getErrorMessagesIdsAreNotEquals();
        var otherUrlId = "/otherId";

        mockMvc.perform(put(apiUrl + otherUrlId, updateDTO)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateDtoAsJson))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.messages", Matchers.containsInAnyOrder(errorMessages)));
    }

    @Test
    @WithMockUser
    void updateContainer_shouldReturnApiErrorAndStatus422_whenIdNotExist() throws Exception {
        var updateDTO = GapTextFactory.ofUpdateDTO();
        var updateDtoAsJson = mapper.writeValueAsString(updateDTO);
        var expectedErrorMessage = GapTextFactory.getErrorMessageIdNotExistUpdate();
        var url = apiUrl + "/" + updateDTO.id();

        mockMvc.perform(put(url, updateDTO)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(updateDtoAsJson))
                .andExpect(status().isUnprocessableEntity())
                .andExpect(jsonPath("$.messages").value(expectedErrorMessage));
    }

    @Test
    void deleteContainer_shouldReturnStatus403_whenNotLoggedIn() throws Exception {
        mockMvc.perform(delete(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(GapTextFactory.id))
                .andExpect(status().isForbidden());
    }

    @Test
    @WithMockUser
    void deleteContainer_shouldReturnApiErrorAndStatus204_whenIdExist() throws Exception {
        var newCreateDTO = GapTextFactory.ofCreateDTO();
        var newCreateDtoAsJson = mapper.writeValueAsString(newCreateDTO);

        var addedContainerAsJson = mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(newCreateDtoAsJson))
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        var addedContainer = mapper.readValue(addedContainerAsJson, GapTextContainer.class);
        var idToDelete = addedContainer.id();
        var url = apiUrl + "/" + idToDelete;

        mockMvc.perform(delete(url))
                .andExpect(status().isNoContent());
    }

    @Test
    @WithMockUser
    void deleteContainer_shouldReturnApiErrorAndStatus404_whenIdNotExist() throws Exception {
        var expectedErrorMessage = GapTextFactory.getErrorMessageIdNotExistDelete();
        var idToDelete = GapTextFactory.id;
        var url = apiUrl + "/" + idToDelete;

        mockMvc.perform(delete(url))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.messages").value(expectedErrorMessage));
    }
}