import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import Header from '../Header/Header.jsx'
import FlexBetween from '../FlexBetween/FlexBetween.jsx'
import { DownloadOutlined, Email, PersonAdd, PointOfSale } from '@mui/icons-material'
import StatBox from '../StatBox/StatBox.jsx'
import { useGetDahsBoardsQuery } from '../../state/api.js'
import OverViewChart from '../OverViewChart/OverViewChart.jsx'
import { DataGrid } from '@mui/x-data-grid'
import BreakDownChart from '../BreakDownChart/BreakDownChart.jsx'
import { useEffect } from 'react'

export default function DashBoard() {
  const theme = useTheme()
  const isNonMediumScreen = useMediaQuery("(min-width: 1200px)")
  const { data, isLoading } = useGetDahsBoardsQuery()



  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "# of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem" >
      <FlexBetween>
        <Header title="DASHBOARD" subTitle="Welcome to your Dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: isNonMediumScreen ? "14px" : "9px",
              fontWeight: "bold",
              marginTop: isNonMediumScreen ? "0" : "30px",
              padding: isNonMediumScreen ? "10px 20px" : "5px 10px"
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns='repeat(12,1fr)'
        gridAutoRows='160px'
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreen ? undefined : "span 12" }
        }}
      >
        <StatBox
          title="Total Customers"
          value={data && data.totalCustomers}
          increase="+14%"
          description="Since last month"
          icon={
            <Email sx={{ color: theme.palette.secondary[300] }} fontSize='26px' />
          }
        />


        <StatBox
          title="Sales Today"
          value={data && data.todayStats.totalSales}
          increase="+21%"
          description="Since last month"
          icon={
            <PointOfSale sx={{ color: theme.palette.secondary[300] }} fontSize='26px' />
          }
        />

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius=".55rem"
        >
          <OverViewChart view="Sales" isDashboard={true} />
        </Box>

        <StatBox
          title="Monthly Sales"
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description="Since last month"
          icon={
            <PersonAdd sx={{ color: theme.palette.secondary[300] }} fontSize='26px' />
          }
        />
        <StatBox
          title="Yearly Sales"
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description="Since last month"
          icon={
            <Email sx={{ color: theme.palette.secondary[300] }} fontSize='26px' />
          }
        />
        {/* Row 2 */}

        <Box
          gridColumn="span 8"
          gridRow='span 3'
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.background.alt,
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            loading={isLoading || !data}
            getRowId={(row) => row._id}
            columns={columns}
            rows={(data && data.transaction) || []}
          />

        </Box>
        <Box
          gridColumn='span 4'
          gridRow='span 3'
          backgroundColor={theme.palette.background.alt}
          p='1.5rem'
          borderRadius=".55rem"
        >
          <Typography variant='h6' sx={{ color: theme.palette.secondary[100] }} >
            Sales By Category
          </Typography>
          <BreakDownChart isDashboard={true} />
          <Typography p="0 0 0.6rem" fontSize=".8rem" sx={{ color: theme.palette.secondary[200] }} >
            Breakdown of real states and information via category for revenue
            made for this year and total sales.
          </Typography>
        </Box>

      </Box>


    </Box>

  )
}
