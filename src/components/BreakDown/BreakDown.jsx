import { Box } from '@mui/material'
import React from 'react'
import Header from '../Header/Header.jsx'
import BreakDownChart from '../BreakDownChart/BreakDownChart.jsx'

export default function BreakDown() {
    return (
        <Box m="1.5rem 2.5rem" >
            <Header title="BREAKDOWN" subTitle="Breakdown of sales by category." />
            <Box mt='40px' height="75vh" >
                <BreakDownChart/>
            </Box>
        </Box>
    )
}
