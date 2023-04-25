import React from "react";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import {useNavigate} from "react-router-dom";

export default function ResponsiveAppBarBottom() {
    const navigation = useNavigate()

    const goToStart = () => {
        navigation("/")
    }

    return (
        <>
            <BottomNavigation showLabels sx={{position: "fixed", bottom: 0, left: 0, right: 0}}>
                <BottomNavigationAction
                    label="Start"
                    icon={<HomeIcon/>}
                    onClick={goToStart}
                />
            </BottomNavigation>
        </>
    );
}