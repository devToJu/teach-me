import {Button, Menu, PopoverOrigin} from "@mui/material";
import React, {useContext} from "react";
import {AuthContext} from "../../security/common/AuthContext";
import {PageModelGroup} from "./PageModel";
import PageMenuItems from "./PageMenuItems";
import {Run} from "../models/CallbackTypes";

type Props = {
    pages: PageModelGroup,
    menuStartPosition: PopoverOrigin,
    onCloseCallback: Run
}

export default function PageMenu(props: Props) {
    const {name, subitems} = props.pages
    const {isAuthenticated} = useContext(AuthContext)

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
        props.onCloseCallback()
    }

    return (
        <>
            {
                isAuthenticated &&
                <>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        color="inherit"
                        onClick={handleClick}
                    >
                        {name}
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        anchorOrigin={props.menuStartPosition}
                        open={open}
                        onClose={handleClose}
                    >
                        <PageMenuItems subitems={subitems} onCloseCallback={handleClose}/>
                    </Menu>
                </>
            }
        </>
    )
}