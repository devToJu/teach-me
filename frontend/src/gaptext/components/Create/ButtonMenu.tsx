import {Button, Stack} from "@mui/material";
import React, {useContext} from "react";
import {GapTextCreateContext} from "../../contexts/GapTextCreateContext";
import {useNavigate, useParams} from "react-router-dom";

export default function ButtonMenu() {
    const {id} = useParams()
    const navigation = useNavigate()
    const {clearContainer} = useContext(GapTextCreateContext)

    return (
        <Stack direction="row" spacing={2} justifyContent="flex-end">
            {
                id ?
                    <Button onClick={() => navigation(-1)} variant="outlined">Back</Button>
                    :
                    <Button onClick={clearContainer} variant="outlined">Clear</Button>
            }
            <Button type="submit" variant="outlined">Save</Button>
        </Stack>
    )
}