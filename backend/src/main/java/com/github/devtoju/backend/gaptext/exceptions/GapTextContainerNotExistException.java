package com.github.devtoju.backend.gaptext.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

public class GapTextContainerNotExistException extends RuntimeException {
    @Getter
    private final HttpStatus httpStatus;

    private GapTextContainerNotExistException(String message, HttpStatus httpStatus) {
        super(message);
        this.httpStatus = httpStatus;
    }

    public static GapTextContainerNotExistException of(String containerId) {
        return new GapTextContainerNotExistException(idNotExistMessage(containerId), HttpStatus.NOT_FOUND);
    }

    public static GapTextContainerNotExistException ofUpdate(String containerId) {
        var message = "Updating of Gap text container denied: " + idNotExistMessage(containerId);
        return new GapTextContainerNotExistException(message, HttpStatus.UNPROCESSABLE_ENTITY);
    }

    public static GapTextContainerNotExistException ofDelete(String containerId) {
        var message = "Deleting of Gap text container failed: " + idNotExistMessage(containerId);
        return new GapTextContainerNotExistException(message, HttpStatus.NOT_FOUND);
    }

    private static String idNotExistMessage(String id) {
        return "Container with ID '" + id + "' does not exist!";
    }
}
