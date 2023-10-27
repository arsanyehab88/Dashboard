import {
    Badge, Box, Button, Card, CardContent, FormControl, Grid, IconButton, Input, InputAdornment,
    InputLabel, TextField, Typography, useTheme
} from '@mui/material'
import React from 'react'
import Header from '../Header/Header.jsx'
import Joi from 'joi';
import { useState } from 'react';
import { AlternateEmail, Password, Visibility, VisibilityOff } from '@mui/icons-material';
import { ThemeContext } from '@emotion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../state/api.js';
import { ToastContainer, toast } from 'react-toastify';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import InputEmail from '../../assets/InputEmail/InputEmail.jsx';




const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Signin() {


    const [Signin] = useSignInMutation()

    const [isLoading, setIsloading] = useState(false)

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate()


    const schema = Joi.object({
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ru','uk','org','us'] } }),
        password: Joi.string().min(3).required(),
    });





    const [user, setUser] = useState({ email: "", password: "" })

    const [errors, setErrors] = useState(undefined)

    const handleEmailChange = (event) => {
        setUser((prevUser) => ({
            ...prevUser,
            email: event.target.value,
        }));
    };
    const handlePasswordChange = (event) => {
        setUser((prevUser) => ({
            ...prevUser,
            password: event.target.value,
        }));
    };
    const theme = useTheme()

    //Snackbar
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };



    const handleSubmit = (event) => {
        event.preventDefault();

        setIsloading(true)

        const { error } = schema.validate(user, { abortEarly: true });
        if (error) {
            if (error?.details[0]?.path[0] == "email") {
                setErrors("Invalid Email Format")
                setIsloading(false)
                handleClick()
            }
            if (error?.details[0]?.path[0] == "password") {
                setErrors("Invalid Password Format")
                setIsloading(false)
                handleClick()
            }

            return;
        } else {
            Signin(user).then(({ data, error }) => {
                if (data?.message == 'Done') {
                    setIsloading(false)
                    navigate("/dashboard")
                } else {
                    setIsloading(false)
                    setErrors(error?.data?.message)
                    handleClick()
                }
            }).catch((e) => {
                setIsloading(false)
            })
        }
    };

    return (
        <>
            <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {errors}
                </Alert>
            </Snackbar>


            <Box m="1.5rem 2.5rem">
                <Header title="Sign In" />

                <Grid container
                    spacing={4}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    mt="20px"
                >

                    <Grid item xs={6} mb="20px">
                        <InputEmail user={user.email} width={'30ch'} handleEmailChange={handleEmailChange} />
                    </Grid>
                    <Grid item xs={7}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <Password sx={{ color: 'action.active', mr: .5, my: 0.5 }} />
                            <FormControl sx={{ m: .5, width: '30ch' }} variant="standard">
                                <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                 <Input
                                    id="standard-adornment-password3"
                                    type={showPassword ? 'text' : 'password'}

                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    value={user.password}
                                    onChange={handlePasswordChange}
                                />
                            </FormControl>

                        </Box>
                    </Grid>
                    <Grid item xs={5} mt="20px" >
                        {isLoading ?
                            <LoadingButton loading variant="contained">
                                Submit
                            </LoadingButton> :
                            <Button size='large' variant='contained' onClick={handleSubmit} >Sign In</Button>
                        }


                    </Grid>
                    <Grid item xs={6} mt="20px"  >

                        <Typography variant='subtitle1' color={theme.palette.secondary[100]}>You dont have account?
                            <Link className='link' to='/signup'>Sign up</Link>
                        </Typography>



                    </Grid>
                </Grid>
            </Box>
        </>

    )
}
