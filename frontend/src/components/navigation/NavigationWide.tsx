import {Box, Button} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {PageModel} from "./PageModel";

type Props = {
    handleCloseNavMenu: () => void,
    pages: PageModel[]
}

export default function NavigationWide(props: Props) {
    const navigation = useNavigate();

    const handleCloseNavMenu = (url: string) => {
        navigation(url)
        props.handleCloseNavMenu()
    }

    return (
        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {props.pages.map((page) => (
                <Button
                    key={page.name}
                    onClick={() => handleCloseNavMenu(page.url)}
                    sx={{my: 2, color: 'white', display: 'block'}}
                >
                    {page.name}
                </Button>
            ))}
        </Box>
    )
}