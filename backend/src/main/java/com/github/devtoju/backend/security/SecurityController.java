package com.github.devtoju.backend.security;

import com.github.devtoju.backend.security.common.UserInDbAuthException;
import com.github.devtoju.backend.security.jwt.JwtService;
import com.github.devtoju.backend.security.models.LoginData;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.*;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class SecurityController {
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    @PostMapping("login")
    public String login(@RequestBody LoginData data) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(
                data.username(),
                data.password()
        );

        try {
            authenticationManager.authenticate(authenticationToken);
        }
        catch (DisabledException | LockedException | BadCredentialsException e) {
            throw new UserInDbAuthException(e);
        }

        return jwtService.createToken(data.username());
    }
}
