import {Button, Stack} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

type Props = {
    isCreateContainer: boolean,
    clearContainer: () => void
}

export default function ButtonMenu(props: Props) {
    const navigation = useNavigate()
    const {isCreateContainer, clearContainer} = props

    return (
        <Stack direction="row" spacing={2} justifyContent="flex-end">
            {
                isCreateContainer ?
                    <Button onClick={clearContainer} variant="outlined">Clear</Button>
                    :
                    <Button onClick={() => navigation(-1)} variant="outlined">Back</Button>
            }
            <Button type="submit" variant="outlined">Save</Button>
        </Stack>
    )
}