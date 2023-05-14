import {Button, Stack} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

export type ButtonMenuProps = {
    isCreateContainer: boolean,
    savingIsInProgress: boolean,
    clearContainer: () => void
}

type Props = {
    values: ButtonMenuProps
}

export default function ButtonMenu(props: Props) {
    const navigation = useNavigate()
    const {isCreateContainer, savingIsInProgress, clearContainer} = props.values

    return (
        <Stack direction="row" spacing={2} justifyContent="flex-end">
            {
                isCreateContainer ?
                    <Button onClick={clearContainer} variant="outlined">Clear</Button>
                    :
                    <Button
                        disabled={savingIsInProgress}
                        onClick={() => navigation(-1)}
                        variant="outlined">Back</Button>
            }
            <Button type="submit" variant="outlined">Save</Button>
        </Stack>
    )
}