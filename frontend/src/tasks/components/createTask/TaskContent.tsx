import {Box} from "@mui/material";
import React, {useState} from "react";
import TaskInputField from "./TaskInputField";
import AddedTaskItems from "./AddedTaskItems";
import {Retrievable} from "../../../components/interfaces/Retrievable";

const boxStyleBorder = {
    display: 'flex',
    flexWrap: 'wrap',
}

type Props = {
    items: Retrievable[]
}

export default function TaskContent(props: Props) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [searchTerms, setSearchTerms] = useState("")

    return (
        <Box sx={boxStyleBorder}>
            <TaskInputField label="Name" value={name} setValue={setName}/>
            <TaskInputField label="Description" value={description} setValue={setDescription}/>
            <TaskInputField label="Search Terms" value={searchTerms} setValue={setSearchTerms}/>
            <AddedTaskItems items={props.items} />
        </Box>
    )
}