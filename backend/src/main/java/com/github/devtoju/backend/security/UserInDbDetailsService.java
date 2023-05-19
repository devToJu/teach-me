package com.github.devtoju.backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class UserInDbDetailsService implements UserDetailsService {

    private final UserInDbRepo repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var userInDb = repo.getUserInDbByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with username '" + username + "' not found!"));

        return new User(userInDb.username(), userInDb.password(), Collections.emptyList());
    }
}
