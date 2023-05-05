import {Button, Stack} from "@mui/material";
import React, {useContext} from "react";
import {GapTextCreateContext} from "../../contexts/GapTextCreateContext";

export default function ButtonMenu() {
    const {clearContainer} = useContext(GapTextCreateContext)

    return (
        <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button onClick={clearContainer} variant="outlined">Clear</Button>
            <Button type="submit" variant="outlined">Save</Button>
        </Stack>
    )
}