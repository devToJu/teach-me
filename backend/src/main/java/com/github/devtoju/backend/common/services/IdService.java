package com.github.devtoju.backend.common.services;

import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class IdService {
    public String createUniqueId() {
        return UUID.randomUUID().toString();
    }
}
