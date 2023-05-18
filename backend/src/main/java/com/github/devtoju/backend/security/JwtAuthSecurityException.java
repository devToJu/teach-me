package com.github.devtoju.backend.security;

public class JwtAuthSecurityException extends RuntimeException {
    public JwtAuthSecurityException(RuntimeException cause) {
        super("Login failed: " + cause.getMessage());
    }
}
