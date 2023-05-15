import {Box, CircularProgress, Container, Paper, Popover, Typography} from "@mui/material";
import React, {FormEvent, useState} from "react";
import {formStyle, formStyleOpacity} from "./GapTextCreateOrUpdateStyles";
import GapTextCreateOrUpdateContainer, {GapTextCreateOrUpdateContainerProps} from "./GapTextCreateOrUpdateContainer";
import Description from "./Description";
import ButtonMenu from "./ButtonMenu";
import {useGapTextContainer} from "../../common/useGapTextContainer";
import {useNavigate} from "react-router-dom";
import {urlGapText} from "../../../components/navigation/PageModel";

export default function GapTextCreateOrUpdate() {
    const [anchorEl, setAnchorEl] = React.useState<HTMLFormElement | null>(null);
    const [isInProgress, setIsInProgress] = useState(false)
    const inProgress = isInProgress ? "simple-popover" : undefined;
    const navigate = useNavigate()

    const {
        description,
        gapTexts,
        isCreateContainer,
        setDescription,
        addEmptyRow,
        removeRow,
        updateRow,
        clearContainer,
        saveContainer,
        updateContainer
    } = useGapTextContainer()

    const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        showInProgressPopover(event.currentTarget)

        isCreateContainer ?
            saveContainer(hideInProgressPopover) :
            updateContainer(onUpdateFinished, hideInProgressPopover)
    }

    const showInProgressPopover = (coveredElement: HTMLFormElement) => {
        setAnchorEl(coveredElement);
        setIsInProgress(true);
    }

    const hideInProgressPopover = () => {
        setIsInProgress(false);
        setAnchorEl(null);
    }

    const onUpdateFinished = () =>  {
        hideInProgressPopover()
        navigate(urlGapText)
    }

    const gapTextCreateOrUpdateContainerProps: GapTextCreateOrUpdateContainerProps = {
        gapTexts,
        addEmptyRow,
        updateRow,
        removeRow
    }

    return (
        <Container sx={{py: 8}} maxWidth="lg">
            <Paper elevation={12}>
                <Typography
                    align="center"
                    pt={5}
                    variant="h6"
                >
                    {isCreateContainer ? "Create a Gap Text" : "Update a Gap Text"}
                </Typography>
                <form
                    aria-describedby={inProgress}
                    onSubmit={handleOnSubmit}
                    style={isInProgress ? formStyleOpacity : formStyle}
                >
                    <Description description={description} setDescription={setDescription}/>
                    <GapTextCreateOrUpdateContainer values={gapTextCreateOrUpdateContainerProps}/>
                    <ButtonMenu clearContainer={clearContainer} isCreateContainer={isCreateContainer}/>
                </form>
                <Popover
                    id={inProgress}
                    open={isInProgress}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                >
                    <Box sx={{display: 'flex', justifyContent: 'center', pt: 2}}>
                        <CircularProgress/>
                    </Box>
                    <Typography sx={{p: 2}}>Processing data...</Typography>
                </Popover>
            </Paper>
        </Container>
    )
}