import {Box, IconButton, Menu} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PageMenu from "./PageMenu";
import React from "react";
import {topRight} from "../models/PopoverStartPositions";
import {PageModelGroup} from "./PageModel";

type Props = {
    pages: PageModelGroup
}
export default function NavigationNarrow(props: Props) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    }

    return (
        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon/>
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{display: {xs: 'block', md: 'none'},}}
            >
                <PageMenu
                    pages={props.pages}
                    menuStartPosition={topRight}
                    onCloseCallback={handleCloseNavMenu}
                />
            </Menu>
        </Box>
    )
}