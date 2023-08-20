package com.github.devtoju.backend.security.jwt;

import io.jsonwebtoken.*;
import jakarta.servlet.*;
import jakarta.servlet.http.*;
import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.util.Strings;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {
	private final JwtService jwtService;

	private HttpServletResponse response;
	private HttpServletRequest request;
	private FilterChain filterChain;
	private String authHeader;

	@Override
	protected void doFilterInternal(
			HttpServletRequest request,
			HttpServletResponse response,
			FilterChain filterChain
	) {
		this.response = response;
		this.request = request;
		this.filterChain = filterChain;
		this.authHeader = request.getHeader("Authorization");

		if (tryToSkipLogin()) {
			return;
		}

		extractUsername().ifPresent(username -> {
			loginUser(username);
			doFilter();
		});
	}

	private boolean tryToSkipLogin() {
		var isUserIsLoggedIn = SecurityContextHolder.getContext().getAuthentication() != null;
		var hasNoUserToLogin = Strings.isBlank(authHeader);

		if (isUserIsLoggedIn || hasNoUserToLogin) {
			doFilter();
		}

		return isUserIsLoggedIn || hasNoUserToLogin;
	}

	private Optional<String> extractUsername() {
		var token = authHeader.replace("Bearer", "").trim();

		try {
			return Optional.of(getClaims(token).getSubject());
		} catch (JwtAuthSecurityException e) {
			createErrorResponse(HttpStatus.UNAUTHORIZED, e.getMessage());
			return Optional.empty();
		}
	}

	private Claims getClaims(String token) {
		try {
			return jwtService.validateToken(token);
		} catch (JwtException | IllegalArgumentException e) {
			throw new JwtAuthSecurityException(e);
		}
	}

	private void loginUser(String username) {
		var authenticationToken = new UsernamePasswordAuthenticationToken(username, "", List.of());
		SecurityContextHolder.getContext().setAuthentication(authenticationToken);
	}

	private void doFilter() {
		try {
			filterChain.doFilter(request, response);
		} catch (FileNotFoundException e) {
			var error = "Request endpoint " + request.getRequestURI() + " not found!";
			createErrorResponse(HttpStatus.BAD_REQUEST, error);
		} catch (IOException | ServletException e) {
			createErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}

	private void createErrorResponse(HttpStatus httpStatus, String errorMessage) {
		try {
			response.setStatus(httpStatus.value());
			response.getWriter().write(errorMessage);
		} catch (IOException e) {
			// TODO: add to logger
		}
	}
}
