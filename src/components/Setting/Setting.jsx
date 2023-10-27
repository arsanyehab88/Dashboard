import { Alert, Box, FormControl, Input, Grid, InputLabel, Snackbar, Typography, InputAdornment, IconButton, Button, useTheme } from '@mui/material';
import React from 'react'
import Header from '../Header/Header.jsx';
import { Password, Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useChangePasswordMutation } from '../../state/api.js';
import { useSelector } from 'react-redux';

export default function Setting() {

  //password 1
  const [showOldPassword, setShowOldPassword] = useState(false);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);


  //password 2
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //password 3
  const [showRePassword, setShowRePassword] = useState(false);
  const handleClickShowRePassword = () => setShowRePassword((show) => !show);

  const [isLoading, setIsloading] = useState(false)


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

  //aler error

  const [open2, setOpen2] = useState(false);


  const handleClick2 = () => {
    setOpen2(true);
  };

  const handleClose2 = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen2(false);
  };

  const _id = useSelector((state) => state?.user?.user?._id)

  const [user, setUser] = useState({ _id, oldPassword: "", password: "", RePassword: "" })

  const handleOldPasswordChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      oldPassword: event.target.value,
    }));
  };

  const handlePasswordChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      password: event.target.value,
    }));
  };

  const handleRePasswordChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      RePassword: event.target.value,
    }));
  };

  const theme = useTheme()

  const [errors, setErrors] = useState(undefined)


  //api
  const [ChangePassword] = useChangePasswordMutation()

  const submit = (e) => {
    e.preventDefault();
    setIsloading(true)

    if (user?.password !== user.RePassword) {
      setIsloading(false)
      handleClick2()
      setErrors("Password Not Match RePassword")
      return
    }
    if (user?.password === user?.oldPassword) {
      setIsloading(false)
      handleClick2()
      setErrors("Password  Match Old Password")
      return
    }
    ChangePassword(user).then(({ data, error }) => {
      if (data.message == "Success") {
        setIsloading(false)
        user.password = ""
        user.RePassword = ""
        user.oldPassword = ""
        handleClick()
      } else {
        setIsloading(false)

        setErrors(error?.data?.message)
        handleClick2()
      }
    }).catch((e) => {
      setIsloading(false)
    })

  }


  return (
    <>
      <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Success
        </Alert>
      </Snackbar>

      {/*errors */}
      <Snackbar open={open2} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={6000} onClose={handleClose2}>
        <Alert onClose={handleClose2} severity="error" sx={{ width: '100%' }}>
          {errors}
        </Alert>
      </Snackbar>



      <Box m="1.5rem 2.5rem">
        <Header title="Change Password" />

        <Grid container
          spacing={4}
          direction="column"
          alignItems="center"
          justifyContent="center"
          mt="20px"
        >

          <Grid item xs={7}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Password sx={{ color: 'action.active', mr: .5, my: 0.5 }} />
              <FormControl sx={{ m: .5, width: '30ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password1">Old Password</InputLabel>
                <Input
                  id="standard-adornment-password1"
                  type={showOldPassword ? 'text' : 'password'}

                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowOldPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={user.oldPassword}
                  onChange={handleOldPasswordChange}
                />
              </FormControl>

            </Box>
          </Grid>


          <Grid item xs={7}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Password sx={{ color: 'action.active', mr: .5, my: 0.5 }} />
              <FormControl sx={{ m: .5, width: '30ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password2">New Password</InputLabel>
                <Input
                  id="standard-adornment-password2"
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

          <Grid item xs={7}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <Password sx={{ color: 'action.active', mr: .5, my: 0.5 }} />
              <FormControl sx={{ m: .5, width: '30ch' }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password3">Re-Password</InputLabel>
                <Input
                  id="standard-adornment-password3"
                  type={showRePassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowRePassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showRePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  value={user.RePassword}
                  onChange={handleRePasswordChange}
                />
              </FormControl>

            </Box>
          </Grid>

          <Grid item xs={5} mt="20px" >
            {isLoading ?
              <LoadingButton loading variant="contained">
                Submit
              </LoadingButton> :
              <Button size='large' variant='contained' onClick={submit} >Submit</Button>
            }
          </Grid>
        </Grid>
      </Box>
    </>
  )
}
