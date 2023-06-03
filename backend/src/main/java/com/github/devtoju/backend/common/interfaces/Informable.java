package com.github.devtoju.backend.common.interfaces;

public interface Informable {
    /**
     * Get a short description of the item
     * @return Information about the added item
     */
    String getInfo();

    /**
     * Get the id of the item
     * @return Items Id
     */
    String id();
}
