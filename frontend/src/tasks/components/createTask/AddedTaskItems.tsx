import React from "react"
import {List, ListSubheader} from "@mui/material"
import AddedItem from "./AddedItem";
import {Retrievable} from "../../../components/interfaces/Retrievable";

const listStyle = {
    width: '100%',
    height: "100%",
    minHeight: 100,
    maxHeight: 175,
    overflow: "auto",
    bgcolor: 'background.paper',
    border: 1,
    borderRadius: 1,
    borderColor: "grey.400",
}

type Props = {
    items: Retrievable[]
}

export default function AddedTaskItems(props: Props) {
    return (
        <List sx={listStyle}
              subheader={
                  <ListSubheader sx={{bgcolor: "lightgray"}}>Added Items</ListSubheader>
              }
        >
            {
                props.items.map(item => <AddedItem key={item.id} info={item.getInfo()}/>)
            }
        </List>
    )
}