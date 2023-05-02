import {AppBar, Container, Toolbar} from "@mui/material";
import LogoNarrow from "./LogoNarrow";
import LogoWide from "./LogoWide";
import React from "react";
import NavigationNarrow from "./NavigationNarrow";
import NavigationWide from "./NavigationWide";
import {urlGapText, urlGapTextCreate} from "./PageModel";

const pages = [
    {url: urlGapText, name:'Gap Text Gallery'},
    {url: urlGapTextCreate, name: 'Create Gap Text'}
];

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
                    <LogoWide/>
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
                    <LogoNarrow/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}