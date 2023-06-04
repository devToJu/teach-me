import {Box} from "@mui/material";
import React, {useState} from "react";
import TaskInputField from "./TaskInputField";
import AddedTaskItems from "./AddedTaskItems";

const boxStyleBorder = {
    display: 'flex',
    flexWrap: 'wrap',
    pb: 1,
    '& > :not(style)': {
        width: "90%",
    }
}

export default function TaskContent() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [searchTerms, setSearchTerms] = useState("")

    return (
        <Box sx={boxStyleBorder}>
            <TaskInputField label="Name" value={name} setValue={setName}/>
            <TaskInputField label="Description" value={description} setValue={setDescription}/>
            <TaskInputField label="Search Terms" value={searchTerms} setValue={setSearchTerms}/>
            <AddedTaskItems />
        </Box>
    )
}