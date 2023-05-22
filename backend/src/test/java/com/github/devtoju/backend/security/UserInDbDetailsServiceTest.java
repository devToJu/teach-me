package com.github.devtoju.backend.security;

import com.github.devtoju.backend.security.models.UserInDb;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserInDbDetailsServiceTest {
    private final UserInDbRepo repo = mock(UserInDbRepo.class);

    private UserInDbDetailsService service;

    @BeforeEach
    void init() {
        service = new UserInDbDetailsService(repo);
    }

    @Test
    void loadUserByUsername_shouldReturnUser_whenUserExist() {
        var username = "test";
        var optionalOfUserInDb = Optional.of(new UserInDb("test", username, "test"));
        var expectedUser = new User(username, "test", Collections.emptyList());

        when(repo.getUserInDbByUsername(username))
                .thenReturn(optionalOfUserInDb);

        var actualUser = service.loadUserByUsername(username);

        verify(repo).getUserInDbByUsername(username);
        assertEquals(expectedUser, actualUser);
    }

    @Test
    void loadUserByUsername_shouldThrowException_whenUserDoesNotExist() {
        var username = "test";
        var expectExceptionMessage = "User with username '" + username + "' not found!";

        when(repo.getUserInDbByUsername(username))
                .thenReturn(Optional.empty());

        var actualExceptionMessage = assertThrows(
                UsernameNotFoundException.class,
                () -> service.loadUserByUsername(username))
                .getMessage();

        verify(repo).getUserInDbByUsername(username);
        assertEquals(expectExceptionMessage, actualExceptionMessage);
    }

}