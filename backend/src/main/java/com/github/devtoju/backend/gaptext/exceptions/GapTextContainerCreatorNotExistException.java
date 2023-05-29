package com.github.devtoju.backend.gaptext.exceptions;

public class GapTextContainerCreatorNotExistException extends RuntimeException {
    public GapTextContainerCreatorNotExistException(String creator) {
        super("Creator '" + creator + "' of Container not exist!");
    }
}
