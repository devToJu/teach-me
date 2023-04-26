import {AppBar, Container, Toolbar} from "@mui/material";
import LogoNarrow from "./LogoNarrow";
import LogoWide from "./LogoWide";
import React from "react";
import NavigationNarrow from "./NavigationNarrow";
import NavigationWide from "./NavigationWide";

const pages = ['Gap Text Gallery'];

export default function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LogoNarrow/>
                    <NavigationNarrow
                        anchorElNav={anchorElNav}
                        handleCloseNavMenu={handleCloseNavMenu}
                        handleOpenNavMenu={handleOpenNavMenu}
                        pages={pages}
                    />
                    <NavigationWide
                        handleCloseNavMenu={handleCloseNavMenu}
                        pages={pages}
                    />
                    <LogoWide/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}