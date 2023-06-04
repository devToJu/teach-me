package com.github.devtoju.backend.common.interfaces;

public interface Retrievable {
    /**
     * Get a short description of the item
     * @return Information about the item
     */
    String getInfo();

    /**
     * Get the id of the item
     * @return Items Id
     */
    String id();
}
