import {useState} from "react";
import {Consumer, Run} from "../../components/models/CallbackTypes";

export type AddItemValues = {
    addedItemsIds: string[]
    addItem: Consumer<string>
    removeItem: Consumer<string>
    clearAddedItemsIds: Run,
    setAddedItemsIds: Consumer<string[]>
}

export function useAddItem() {
    const [addedItemsIds, setAddedItemsIds] = useState<string[]>([])

    const addItem = (id: string) => {
        setAddedItemsIds(prevState => [...prevState, id])
    }

    const removeItem = (id: string) => {
        setAddedItemsIds(prevState =>
            prevState.filter(item => item !== id))
    }

    const clearAddedItemsIds = () => {
        setAddedItemsIds([])
    }

    const addItemValues: AddItemValues = {
        addedItemsIds,
        addItem,
        removeItem,
        clearAddedItemsIds,
        setAddedItemsIds
    }

    return {addItemValue: addItemValues}
}