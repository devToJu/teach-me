import {AppBar, Container, Toolbar} from "@mui/material";
import Logo from "./Logo";
import LogoCollapsed from "./LogoCollapsed";

export default function ResponsiveAppBar() {
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Logo/>
                    <LogoCollapsed/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}