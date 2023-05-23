package com.github.devtoju.backend.security.common;

public class UserInDbAuthException extends RuntimeException {

    public UserInDbAuthException(RuntimeException e) {
        super("Authentication request rejected: " + e.getMessage());
    }
}
