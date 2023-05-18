package com.github.devtoju.backend.security;

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

        authenticationManager.authenticate(authenticationToken);
        return jwtService.createToken(data.username());
    }
}
