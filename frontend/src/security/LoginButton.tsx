import {Button} from "@mui/material";
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {urlLogin} from "../components/navigation/PageModel";
import {AuthContext} from "./common/AuthContext";

export default function LoginButton() {
    const {isAuthenticated} = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <>
            {
                !isAuthenticated &&
                <Button color="inherit" onClick={() => navigate(urlLogin)}>Login</Button>
            }
        </>
    )
}