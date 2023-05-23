package com.github.devtoju.backend.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.devtoju.backend.security.models.LoginData;
import com.github.devtoju.backend.security.models.UserInDb;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;

import java.util.Collections;

public class SecurityFactory {
    private static final ObjectMapper mapper = new ObjectMapper();
    private static final Argon2PasswordEncoder encoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    static final String username = "test";
    static final String pw = "test";

    static final String errorBadCredentials = "Authentication request rejected: Bad credentials";
    static final String errorUserNotFound = "User with username '" + username + "' not found!";

    public static String ofLoginDataAsJson() throws Exception {
        var loginData = new LoginData(username, pw);
        return mapper.writeValueAsString(loginData);
    }

    public static UserInDb ofUserInDb() {
        var pwHash = encoder.encode(SecurityFactory.pw);
        return new UserInDb("id", username, pwHash);
    }

    static User ofUser() {
        return new User(username, pw, Collections.emptyList());
    }
}
