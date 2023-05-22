import {Button} from "@mui/material";
import React, {useContext} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../common/AuthContext";
import ShowWhenAuthenticated from "./ShowWhenAuthenticated";

export default function SignOutButton() {
    const {logout} = useContext(AuthContext)
    const navigate = useNavigate()

    const signOut = () => {
        logout()
        navigate("/")
    }

    return (
        <ShowWhenAuthenticated>
            <Button color="inherit" onClick={signOut}>Sign out</Button>
        </ShowWhenAuthenticated>
    )
}