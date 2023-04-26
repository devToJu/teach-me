import {Box, IconButton, Menu, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import React from "react";
import {useNavigate} from "react-router-dom";

type Props = {
    anchorElNav: null | HTMLElement,
    handleCloseNavMenu: () => void,
    handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void,
    pages: string[]
}
export default function NavigationNarrow(props: Props) {
    const navigation = useNavigate();

    const handleCloseNavMenu = () => {
        navigation("/gaptext")
        props.handleCloseNavMenu()
    }

    return (
        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={props.handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={props.anchorElNav}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                open={Boolean(props.anchorElNav)}
                onClose={props.handleCloseNavMenu}
                sx={{
                    display: {xs: 'block', md: 'none'},
                }}
            >
                {props.pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                ))}
            </Menu>
        </Box>
    )
}