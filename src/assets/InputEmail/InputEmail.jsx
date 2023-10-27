import { AlternateEmail } from '@mui/icons-material'
import { Box, TextField } from '@mui/material'
import React from 'react'

export default function InputEmail({user , handleEmailChange,width}) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }} >
            <AlternateEmail sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField id="input-with-sx2" sx={{ m: .5, width }} value={user.email} onChange={handleEmailChange} label="Email" variant="standard" />
        </Box>
    )
}
