import GapTextCreate from "./GapTextCreate";
import GapTextCreateContextProvider from "../../contexts/GapTextCreateContextProvider";
import React from "react";

export default function GapTextCreateOrUpdate() {
    return (
        <>
            <GapTextCreateContextProvider>
                <GapTextCreate/>
            </GapTextCreateContextProvider>
        </>
    )
}