import {Divider, ListItem, ListItemButton, ListItemText} from "@mui/material";
import React from "react";

type Props = {
    info: string
}

export default function AddedItem(props:Props) {
    return(
        <>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemText primary={props.info}/>
                </ListItemButton>
            </ListItem>
            <Divider/>
        </>
    )
}