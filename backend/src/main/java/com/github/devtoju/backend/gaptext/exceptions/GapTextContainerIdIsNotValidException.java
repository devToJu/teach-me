package com.github.devtoju.backend.gaptext.exceptions;

import lombok.Getter;

public class GapTextContainerIdIsNotValidException extends RuntimeException {
    @Getter
    private final String urlId;
    @Getter
    private final String containerId;
    public GapTextContainerIdIsNotValidException(String urlId, String containerId) {
        super("Gap text container ID '" + urlId + "' is invalid!");

        this.urlId  = urlId;
        this.containerId = containerId;
    }
}
