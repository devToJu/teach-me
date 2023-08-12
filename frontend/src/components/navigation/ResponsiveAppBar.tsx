import {PageModelGroup, urlGapText, urlGapTextCreate, urlTaskCreate} from "./PageModel";
import React from "react";
import {AppBar, Container, Toolbar} from "@mui/material";
import LogoWide from "./LogoWide";
import NavigationNarrow from "./NavigationNarrow";
import NavigationWide from "./NavigationWide";
import LogoNarrow from "./LogoNarrow";
import SignInButton from "../../security/components/SignInButton";
import SignOutButton from "../../security/components/SignOutButton";


const pages: PageModelGroup = {
    name: "Gap Text",
    subitems: [
        {url: urlGapText, name: 'Gap Text Gallery'},
        {url: urlGapTextCreate, name: 'Create Gap Text'},
        {url: urlTaskCreate, name: 'Create Task'}
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
                    <SignOutButton/>
                    <SignInButton/>
                </Toolbar>
            </Container>
        </AppBar>
    )
}