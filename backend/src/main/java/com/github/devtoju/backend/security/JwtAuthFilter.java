package com.github.devtoju.backend.security;

import io.jsonwebtoken.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        var authHeader = request.getHeader("Authorization");

        // TODO: REMOVE 2 Lines
        System.out.println("authHeader: " + authHeader);
        System.out.println("GetAuthType: " + request.getAuthType());

        var userIsLoggedIn = SecurityContextHolder.getContext().getAuthentication() != null;
        var noUserToLogin = authHeader == null;

        if (userIsLoggedIn || noUserToLogin) {
            filterChain.doFilter(request, response);
            return;
        }

        var token = authHeader.replace("Bearer", "").trim();
        var username = getClaims(token).getSubject();

        loginUser(username);
        filterChain.doFilter(request, response);
    }

    private Claims getClaims(String token) {
        try {
            return jwtService.validateToken(token);
        }
        catch (JwtException | IllegalArgumentException e) {
            throw new JwtAuthSecurityException(e);
        }
    }

    private void loginUser(String username) {
        var authenticationToken = new UsernamePasswordAuthenticationToken(username, "");
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }
}
