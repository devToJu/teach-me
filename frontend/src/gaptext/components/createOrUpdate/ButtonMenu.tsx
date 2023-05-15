import {Button, Stack} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {urlGapText} from "../../../components/navigation/PageModel";

export type Props = {
    isCreateContainer: boolean,
    clearContainer: () => void
}

export default function ButtonMenu(props: Props) {
    const {isCreateContainer, clearContainer} = props
    const navigation = useNavigate()

    const goTo = () => {
        isCreateContainer ? navigation(urlGapText) : navigation(-1)
    }

    return (
        <Stack direction="row" spacing={2} justifyContent="flex-end">
            {isCreateContainer && <Button onClick={clearContainer} variant="outlined">Clear</Button>}
            <Button onClick={goTo} variant="outlined">Back</Button>
            <Button type="submit" variant="outlined"> Save </Button>
        </Stack>
    )
}