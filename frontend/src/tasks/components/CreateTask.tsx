import {Container, Paper} from "@mui/material";
import React from "react";
import Headline from "./createTask/Headline";
import TaskContent from "./createTask/TaskContent";

export default function CreateTask() {
    return (
        <Container sx={{py: 8, pb: 8}} maxWidth="lg">
            <Paper elevation={12} sx={{pb: 3}}>
                <Headline/>
                <TaskContent/>
            </Paper>
        </Container>
    )
}