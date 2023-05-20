import MenuItem from "@mui/material/MenuItem";
import React from "react";
import {PageModel} from "./PageModel";
import {Run} from "../models/CallbackTypes";
import {useNavigate} from "react-router-dom";

type Props = {
    subitems: PageModel[]
    onCloseCallback: Run
}

export default function PageMenuItems(props: Props) {
    const {subitems, onCloseCallback} = props
    const navigation = useNavigate()

    const handleClose = (url: string) => {
        onCloseCallback()
        navigation(url)
    }

    return (
        <>
            {
                subitems.map(item =>
                    <MenuItem key={item.name} onClick={() => handleClose(item.url)}>
                        {item.name}
                    </MenuItem>
                )
            }
        </>
    )
}