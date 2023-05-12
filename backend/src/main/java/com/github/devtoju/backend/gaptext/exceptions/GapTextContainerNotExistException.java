package com.github.devtoju.backend.gaptext.exceptions;

public class GapTextContainerNotExistException extends RuntimeException {
    public GapTextContainerNotExistException(String containerId) {
        super("Updating of Gap text container denied: Container with ID '" + containerId + "' does not exist!");
    }
}
