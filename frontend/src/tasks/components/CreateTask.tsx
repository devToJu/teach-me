import {Button, Container, Paper, Stack} from "@mui/material"
import React, {useCallback, useContext, useState} from "react"
import Headline from "./createTask/Headline"
import TaskContent from "./createTask/TaskContent"
import {useShowDialog} from "../../components/dialogs/useShowDialog";
import SaveDialog from "../../components/dialogs/SaveDialog";
import ItemsGallery from "./selectTaskItem/ItemsGallery";
import {GapTextContext} from "../../gaptext/common/GapTextContext";
import {GapTextContainerToTaskItemMapper} from "../../components/mapper/GapTextContainerToTaskItemMapper";
import {useAddItem} from "../common/useAddItem";
import {Retrievable} from "../../components/interfaces/Retrievable";

const stackStyle = {
    mt: 2,
    mb: 2,
}

export default function CreateTask() {
    const {isOpen, openDialog, closeDialog} = useShowDialog()
    const {addItemValue} = useAddItem()
    const {gapTextContainers} = useContext(GapTextContext)
    const [retrievableItems, setRetrievableItems] = useState<Retrievable[]>([])

    const getAvailableItems = useCallback(() => {
        const containerToTaskItemMapper = new GapTextContainerToTaskItemMapper()

        return gapTextContainers.map(container => {
            const isSelected = addItemValue.addedItemsIds.find(id => id === container.id) !== undefined
            return containerToTaskItemMapper.map(container, isSelected)
        })
    }, [gapTextContainers,addItemValue])

    const getSelectedItems = () => {
        return gapTextContainers.filter(
            container => addItemValue
                .addedItemsIds
                .includes(container.id)
        )
    }

    const handleOnSave = () => {
        const selectedContainers = getSelectedItems()
        setRetrievableItems(selectedContainers)
        closeDialog()
    }

    const handleOnCancel = () => {
        const previouslySelectedContainerIds = retrievableItems.map(item => item.id)
        addItemValue.setAddedItemsIds(previouslySelectedContainerIds)
        closeDialog()
    }

    return (
        <Container sx={{py: 8, pb: 8}} maxWidth="lg">
            <Paper elevation={12} sx={{pb: 3, pr:5, pl: 5}}>
                <Headline/>
                <TaskContent items={retrievableItems}/>
                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={stackStyle}>
                    <Button variant="outlined" onClick={openDialog}>Add Item</Button>
                </Stack>
                <SaveDialog isOpen={isOpen} save={handleOnSave} cancel={handleOnCancel}>
                    <ItemsGallery availableItems={getAvailableItems()} addItemValues={addItemValue}/>
                </SaveDialog>
            </Paper>
        </Container>
    )
}