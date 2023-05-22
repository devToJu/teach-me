import React, {FormEvent, useContext} from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {AuthContext} from "../common/AuthContext";
import {GapTextContext} from "../../../common/GapTextContext";
import {useNavigate} from "react-router-dom";
import {urlGapText} from "../../../../components/navigation/PageModel";
import {useDialogInProgress} from "../../../../components/dialogs/useDialogInProgress";
import DialogInProgress from "../../../../components/dialogs/DialogInProgress";

export default function SignIn() {
    const {isOpen, openDialog, closeDialog} = useDialogInProgress()
    const {loginInputValues, login} = useContext(AuthContext)
    const {loadAllGapTextContainers} = useContext(GapTextContext)
    const navigate = useNavigate()

    const loginSucceed = (token: string) => {
        loadAllGapTextContainers(token)
        navigate(urlGapText)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        openDialog()
        login(loginSucceed, closeDialog)
    }

    return (
        <Container component="main" maxWidth="xs">
            <DialogInProgress isOpen={isOpen}/>
            <CssBaseline/>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    <LockOutlinedIcon/>
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate={false}
                    sx={{mt: 1}}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        value={loginInputValues.username}
                        onChange={(e) => loginInputValues.setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        value={loginInputValues.password}
                        onChange={(e) => loginInputValues.setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{mt: 3, mb: 2}}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}
