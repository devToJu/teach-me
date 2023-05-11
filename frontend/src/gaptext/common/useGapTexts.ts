import {useState} from "react";
import {GapTextModel} from "../models/GapTextModel";
import {v4 as uuidv4} from "uuid";

export default function useGapTexts() {
    const [gapTexts, setGapTexts] = useState<GapTextModel[]>([])

    const addEmptyRow = () => {
        const newGapText: GapTextModel = {
            id: uuidv4(),
            isGap: false,
            value: "",
            rowPosition: gapTexts.length + 1
        }

        setGapTexts([...gapTexts, newGapText])
    }

    const removeRow = (rowToRemove: GapTextModel) => {
        setGapTexts(prevState => prevState
            .filter(row => row.id !== rowToRemove.id)
            .map((row, index) => {
                return {...row, rowPosition: index + 1}
            })
        )
    }

    const updateRow = (rowToUpdate: GapTextModel) => {
        setGapTexts(prevState => prevState
            .map(row => row.id === rowToUpdate.id ? rowToUpdate : row)
        )
    }

    return {gapTexts, setGapTexts, addEmptyRow, removeRow, updateRow}
}