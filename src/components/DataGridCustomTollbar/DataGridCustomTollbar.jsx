import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarExport } from '@mui/x-data-grid'
import React from 'react'
import FlexBetween from '../FlexBetween/FlexBetween.jsx'
import { IconButton, InputAdornment, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'

export default function DataGridCustomTollbar({searchInput , setSearchInput , setSearch}) {
    return (
        <GridToolbarContainer>
            <FlexBetween width="100%">
                <FlexBetween>
                    <GridToolbarColumnsButton/>
                    <GridToolbarDensitySelector />
                    <GridToolbarExport />
                </FlexBetween>
                <TextField
                    label="Search"
                    sx={{ mb: ".rem", width: "15rem" }}
                    onChange={(e)=> setSearchInput(e.target.value)}
                    value={searchInput}
                    variant='standard'
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position='end' >
                                <IconButton onClick={() => { 
                                    setSearchInput(searchInput);
                                    setSearchInput("")
                                }} >
                                    <Search />
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />

            </FlexBetween>
        </GridToolbarContainer>
    )
}
