import {Box, Button} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

type Props = {
    handleCloseNavMenu: () => void,
    pages: string[]
}

export default function NavigationWide(props: Props) {
    const navigation = useNavigate();

    const handleCloseNavMenu = () => {
        navigation("/gaptext")
        props.handleCloseNavMenu()
    }

    return (
        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
            {props.pages.map((page) => (
                <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{my: 2, color: 'white', display: 'block'}}
                >
                    {page}
                </Button>
            ))}
        </Box>
    )
}