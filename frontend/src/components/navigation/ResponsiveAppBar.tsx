import {AppBar, Container, Toolbar} from "@mui/material";
import LogoNarrow from "./LogoNarrow";
import LogoWide from "./LogoWide";
import React from "react";
import NavigationNarrow from "./NavigationNarrow";
import NavigationWide from "./NavigationWide";
import {PageModelGroup, urlGapText, urlGapTextCreate} from "./PageModel";
import LoginButton from "../../security/LoginButton";

const pages: PageModelGroup = {
    name: "Gap Text",
    subitems: [
        {url: urlGapText, name: 'Gap Text Gallery'},
        {url: urlGapTextCreate, name: 'Create Gap Text'}
    ]
}

export default function ResponsiveAppBar() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <LogoWide/>
                    <NavigationNarrow pages={pages}/>
                    <NavigationWide pages={pages}/>
                    <LogoNarrow/>
                    <LoginButton/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}