import { Alert, Autocomplete, Box, Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, Snackbar, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import Header from '../Header/Header.jsx'
import { AccountCircle, AlternateEmail, Badge, Flag, LocalPhone, LocationCity, Password, SensorOccupied, Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'
import { countries } from './contries.js'
import Input from '@mui/material/Input';
import Joi from 'joi'
import { useSignUpMutation } from '../../state/api.js'
import { Link, useNavigate } from 'react-router-dom'
import { LoadingButton } from '@mui/lab'
import InputEmail from '../../assets/InputEmail/InputEmail.jsx'
import InputPassword from '../../assets/InputPassword/InputPassword.jsx'

export default function Signup() {

  const isNonMediumScreen = useMediaQuery("(min-width: 600px)")



  const [open, setOpen] = useState(false);
  const [isLoading, setIsloading] = useState(false)

  const [errors, setErrors] = useState(undefined)



  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  const theme = useTheme()

  const navigate = useNavigate()

  const [user, setUser] = useState({ email: "", name: "", password: "", phoneNumber: "", occupation: "", city: "", country: "" })
  const handleNameChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      name: event.target.value,
    }));
  };
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
  const handleCountryChange = (event, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      country: value?.code || '',
    }));
  };
  const handleCityChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      city: event.target.value,
    }));
  };

  const handlePhoneNumberChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      phoneNumber: event.target.value,
    }));
  };

  const handleOccupationChange = (event) => {
    setUser((prevUser) => ({
      ...prevUser,
      occupation: event.target.value,
    }));
  };

  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(4).required(),
    occupation: Joi.string().required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    phoneNumber: Joi.string().pattern(/^[0-9]{11}$/).required(),
  });

  const [SignUp] = useSignUpMutation()

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
      if (error?.details[0]?.path[0] == "name") {
        setErrors("Invalid Name Format")
        setIsloading(false)
        handleClick()
      }
      if (error?.details[0]?.path[0] == "phoneNumber") {
        setErrors("Invalid PhoneNumber Format")
        setIsloading(false)
        handleClick()
      }
      if (error?.details[0]?.path[0] == "occupation") {
        setErrors("Invalid Occupation Format")
        setIsloading(false)
        handleClick()
      }
      if (error?.details[0]?.path[0] == "password") {
        setErrors("Invalid Password Format")
        setIsloading(false)
        handleClick()
      }
      return;
    }
    SignUp(user).then(({ data, error }) => {
      if (data.message == "Done") {
        setIsloading(false)
        navigate("/dashboard")
      } else {
        setIsloading(false)
        setErrors(error?.data?.message)
        handleClick()
      }

    }).catch((error) => {
      setIsloading(false)
    })

  };

  


  return (
    <>
      <Snackbar open={open} anchorOrigin={{ vertical: "top", horizontal: "center" }} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          {errors}
        </Alert>
      </Snackbar>

      <Box m="2.5rem 2.5rem">
        <Header title="Sign Up" />
        <Box mt="20px" ml={isNonMediumScreen ? "3rem" : ""}>
          <Grid container spacing={4} mx={isNonMediumScreen ? "auto" : ""} >
            <Grid item xs={6} >
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Badge sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx1" value={user.name} onChange={handleNameChange} label="Name" variant="standard" />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <InputEmail handleEmailChange={handleEmailChange} width={'21ch'} user={user.email} />
            </Grid>
            <Grid item xs={6}>
              <InputPassword user={user.password} handlePasswordChange={handlePasswordChange} width={'21ch'} />
            </Grid>
            <Grid item xs={6}  >
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}  >
                <LocationCity sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx4" value={user.city} onChange={handleCityChange} label="City" variant="standard" />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <Flag sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <Autocomplete
                  id="country-select-demo5"
                  sx={{ width: 185 }}
                  options={countries}
                  onChange={handleCountryChange}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Choose a country"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                      }}
                      variant='standard'

                    />
                  )}
                />
              </Box>

            </Grid>

            <Grid item xs={6}>
              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <SensorOccupied sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx6" value={user.occupation} onChange={handleOccupationChange} label="Occupation" variant="standard" />


              </Box>
            </Grid>
            <Grid item xs={6} width="100%" mx="auto" >

              <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                <LocalPhone sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <TextField id="input-with-sx7" value={user.phoneNumber} type='number' onChange={handlePhoneNumberChange} label="Phone Number" variant="standard" />
              </Box>

            </Grid>

          </Grid>
          <Grid container spacing={2} ml={isNonMediumScreen ? "20px" : "10px"} >
            <Grid item xs={5} mt="20px" width="100%" mx="auto" >
              {isLoading ?
                <LoadingButton loading variant="contained">
                  Submit
                </LoadingButton> :
                <Button size='large' variant='contained' onClick={handleSubmit} >Sign Up</Button>
              }
            </Grid>
          </Grid>
          <Grid container spacing={2} ml="20px" >
            <Grid item xs={6} mt="20px" width="100%" mx="auto" >
              <Typography variant='subtitle1' color={theme.palette.secondary[100]}>Already have an account?
                <Link className='link' to='/signin'>Sign in</Link>  </Typography>

            </Grid>
          </Grid>


        </Box>
      </Box>

    </>

  )
}
