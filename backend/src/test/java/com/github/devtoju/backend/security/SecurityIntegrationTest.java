package com.github.devtoju.backend.security;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
class SecurityIntegrationTest {
    private final String apiUrl = "/api/auth/login";

    @Autowired
    MockMvc mockMvc;
    @Autowired
    UserInDbRepo repo;

    @Test
    void login_shouldReturnToken_whenUserSuccessfullyLoggedIn() throws Exception {
        var loginDataAsJson = SecurityFactory.ofLoginDataAsJson();
        var userToAdd = SecurityFactory.ofUserInDb();

        repo.save(userToAdd);

        mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginDataAsJson))
                .andExpect(status().isOk())
                .andExpect(content().string(not(blankOrNullString())));
    }

    @Test
    void login_shouldReturnApiErrorAndStatus401_WhenCredentialsAreWrong() throws Exception {
        var loginDataAsJson = SecurityFactory.ofLoginDataAsJson();
        var expectedMessage = SecurityFactory.errorBadCredentials;

        mockMvc.perform(post(apiUrl)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginDataAsJson))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.messages").value(expectedMessage));
    }
}