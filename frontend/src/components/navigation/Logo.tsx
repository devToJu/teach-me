import SchoolIcon from "@mui/icons-material/School";
import {Typography} from "@mui/material";
import React from "react";

export default function Logo() {
    return (
        <>
            <SchoolIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: {xs: 'none', md: 'flex'},
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                }}
            >
                TEACH ME
            </Typography>
        </>
    );
}