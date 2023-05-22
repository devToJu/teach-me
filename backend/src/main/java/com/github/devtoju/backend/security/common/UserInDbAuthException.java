package com.github.devtoju.backend.security.common;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.*;

import java.util.Map;

public class UserInDbAuthException extends RuntimeException {
    @Getter
    private final HttpStatus httpStatus;

    private static final Map<Class<? extends RuntimeException>, HttpStatus> httpStatusMapping = Map.of(
            DisabledException.class, HttpStatus.UNAUTHORIZED,
            LockedException.class, HttpStatus.LOCKED,
            BadCredentialsException.class, HttpStatus.UNPROCESSABLE_ENTITY
    );

    public UserInDbAuthException(RuntimeException e) {
        super("Authentication request rejected: " + e.getMessage());
        httpStatus = mapExceptionToHttpStatus(e);
    }

    private HttpStatus mapExceptionToHttpStatus(RuntimeException e) {
        return httpStatusMapping.getOrDefault(e.getClass(), HttpStatus.BAD_REQUEST);
    }
}
