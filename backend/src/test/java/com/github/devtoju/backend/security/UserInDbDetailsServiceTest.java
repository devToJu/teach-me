package com.github.devtoju.backend.security;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

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
        var username = SecurityFactory.username;
        var optionalOfUserInDb = Optional.of(SecurityFactory.ofUserInDb());
        var expectedUser = SecurityFactory.ofUser();

        when(repo.getUserInDbByUsername(username))
                .thenReturn(optionalOfUserInDb);

        var actualUser = service.loadUserByUsername(username);

        verify(repo).getUserInDbByUsername(username);
        assertEquals(expectedUser, actualUser);
    }

    @Test
    void loadUserByUsername_shouldThrowException_whenUserDoesNotExist() {
        var username = SecurityFactory.username;
        var expectExceptionMessage = SecurityFactory.errorUserNotFound;

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