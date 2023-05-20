import {Box} from "@mui/material";
import React from "react";
import {PageModelGroup} from "./PageModel";
import PageMenu from "./PageMenu";
import {bottomLeft} from "../models/PopoverStartPositions";

type Props = {
    pages: PageModelGroup
}

export default function NavigationWide(props: Props) {
    return (
        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            <PageMenu
                pages={props.pages}
                menuStartPosition={bottomLeft}
                onCloseCallback={() => {}}
            />
        </Box>
    )
}