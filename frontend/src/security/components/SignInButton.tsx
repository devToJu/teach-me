import {Button} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
import {urlLogin} from "../../components/navigation/PageModel";
import HideWhenAuthenticated from "./HideWhenAuthenticated";

export default function SignInButton() {
    const navigate = useNavigate()

    return (
        <HideWhenAuthenticated>
            <Button color="inherit" onClick={() => navigate(urlLogin)}>Sign in</Button>
        </HideWhenAuthenticated>
    )
}