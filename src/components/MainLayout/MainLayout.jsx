import { Box, styled, useMediaQuery } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar.jsx';
import SideBar from '../SideBar/SideBar.jsx';
import { useSelector } from 'react-redux';
import { useGetUserQuery } from '../../state/api.js';






export default function MainLayout() {
  const isNonMob = useMediaQuery("(min-width:600px)")
  let [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const drawerWidth = 240;
  const userid = useSelector((state) => state?.user?.user?._id)
  
  const { data } = useGetUserQuery(userid)



  return (
    <Box sx={{ display: isNonMob ? "flex" : "block" }} width="100%" height="100%" >
      <SideBar user={data || {}} isNonMob={isNonMob} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} drawerWidth={drawerWidth} />
      <Box flexGrow={1}>
        <NavBar user={data} isNonMob={isNonMob} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} drawerWidth={drawerWidth} />
      
        <Outlet  />
     
        
      </Box>

    </Box>
  )
}

