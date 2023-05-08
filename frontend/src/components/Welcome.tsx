import {Container, Paper, Typography} from "@mui/material";
import React from "react";

export default function Welcome() {
    return (
        <Container sx={{py: 8}} maxWidth="lg">
            <Paper elevation={12} sx={{py:3}}>
                <Typography variant="h6" sx={{textAlign: "center"}}>
                    Welcome to TEACH ME!
                </Typography>
                <Typography sx={{m: 2, textAlign: "center"}}>
                    Deiner individuellen Lernplattform, mit der du von überall
                    deine Übungsaufgaben bearbeiten kannst.
                    <br/><br/>
                    Sei es von daheim aus, an deinem Notebook oder Tablet. Und auch von
                    unterwegs auf deinem Handy ist es kein Problem.
                    <br/><br/>
                    Und das beste daran ist, du musst keine Software installieren
                    und hast auf allen Geräten immer den aktuellsten Stand.
                </Typography>
            </Paper>
        </Container>
    );
}