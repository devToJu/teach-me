import {Container, Grid} from "@mui/material";
import React from "react";
import {TaskItem} from "../../common/TaskItem";
import ItemCard from "./ItemCard";
import {AddItemValues} from "../../common/useAddItem";

type Props = {
    availableItems: TaskItem[],
    addItemValues: AddItemValues
}

export default function ItemsGallery(props: Props) {
    const {availableItems} = props
    const {addItem, removeItem} = props.addItemValues

    return (
        <Container sx={{py: 8}} maxWidth="lg">
            <Grid container spacing={4}>
                {
                    availableItems.map(item =>
                        <ItemCard key={item.id}
                                  item={item}
                                  add={addItem}
                                  remove={removeItem}
                        />
                    )
                }
            </Grid>
        </Container>
    )
}