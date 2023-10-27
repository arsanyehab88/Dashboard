import { Password, Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, FormControl, IconButton, Input, InputAdornment, InputLabel } from '@mui/material';
import React from 'react'
import { useState } from 'react';

export default function InputPassword({user,handlePasswordChange,width}) {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
            <Password sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <FormControl sx={{ m: .5, width }} variant="standard">
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
                    value={user}
                    onChange={handlePasswordChange}
                />
            </FormControl>
        </Box>
    )
}
