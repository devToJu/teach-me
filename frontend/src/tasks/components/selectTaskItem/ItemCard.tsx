import {Card, Divider, Grid, Typography} from "@mui/material"
import React, {useState} from "react"
import {TaskItem} from "../../common/TaskItem"
import {Consumer} from "../../../components/models/CallbackTypes"

const cardStyles = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    cursor: "pointer",
    p: 2
}

const cardSelectedStyles = {
    ...cardStyles,
    border: 2,
    borderRadius: 1,
    borderColor: "#1565c0",
    opacity: .5
}

type Props = {
    item: TaskItem
    add: Consumer<string>
    remove: Consumer<string>
}

export default function ItemCard(props: Props) {
    const {item, add, remove} = props
    const [isAdded, setIsAdded] = useState(item.isSelected)
    const toggleSelection = () => {
        isAdded ? remove(item.id) : add(item.id)
        setIsAdded(prevState => !prevState)
    }

    const currentCardStyle = isAdded ? cardSelectedStyles : cardStyles

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card sx={currentCardStyle} onClick={toggleSelection}>
                <Typography sx={{mb: 1.5}} color="text.primary">
                    {item.description}
                </Typography>
                <Divider sx={{mt: 2, mb: 2}}/>
                <Typography sx={{mb: 1.5}} color="text.primary">
                    {item.text}
                </Typography>
            </Card>
        </Grid>
    )
}