import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import Header from '../Header/Header.jsx'
import OverViewChart from '../OverViewChart/OverViewChart.jsx'

export default function OverView() {

  const [view, setView] = useState("units")

  return (
    <Box m="1.5rem 1.5rem" width="96%" >
      <Header title="OVERVIEW" subTitle="OverView of general revenue and profit." />
      <Box height="75vh" >
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}
          >
            <MenuItem value="sales" >Sales</MenuItem>
            <MenuItem value="units" >Units</MenuItem>
          </Select>
        </FormControl>
        <OverViewChart view={view} />
      </Box>
    </Box>
  )
}
