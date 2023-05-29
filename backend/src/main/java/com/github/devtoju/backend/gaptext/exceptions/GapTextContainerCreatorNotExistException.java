package com.github.devtoju.backend.gaptext.exceptions;

public class GapTextContainerCreatorNotExistException extends RuntimeException {
    public GapTextContainerCreatorNotExistException(String creator) {
        super("Could not get gap texts containers: Creator '" + creator + "' does not exist!");
    }
}
