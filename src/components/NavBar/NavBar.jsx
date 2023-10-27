import React, { useEffect, useState } from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Box,
  Typography,
  IconButton,
  InputBase,
  Toolbar,
  Menu,
  MenuItem,
  useTheme,
  AppBar,
  Avatar,
  Link,
} from "@mui/material";
import FlexBetween from "../FlexBetween/FlexBetween.jsx";
import { useLogOutMutation } from "../../state/api.js";
import {  useNavigate } from "react-router-dom";
import { setMode } from "../../state/userSlice.js";
import { Link as RouterLink, MemoryRouter } from 'react-router-dom'




export default function NavBar({ user, isSidebarOpen, setIsSidebarOpen, drawerWidth, isNonMob }) {
  const dispatch = useDispatch()
  const theme = useTheme()

  const [protecte,setProtected] =useState()
  const [anchors, setAnchors] = useState(null)
  const isOpen = Boolean(anchors)
  const handleClick = (event) => setAnchors(event.currentTarget)
  const handleClose = () => setAnchors(null)
  const userId = useSelector((state) => state?.user?.user?._id)

  const [LogOut] = useLogOutMutation()

  const navigate = useNavigate()


  const Logout = (e) => {
    e.preventDefault()
    setAnchors(null)
    navigate('/signin')
    LogOut(userId)
  }

  useEffect(()=>{
    userId ==undefined ? setProtected(false): setProtected(true)
  },[userId])


  return (
    <AppBar open={isSidebarOpen}
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: isNonMob ? "space-between" : "" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton sx={{ mr: 2, ...(isSidebarOpen && { display: 'none' }) }} onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          {protecte ?
            <FlexBetween
              backgroundColor={theme.palette.background.alt}
              borderRadius="9px"
              gap={isNonMob ? "3rem" : "0.3rem"}
              p={isNonMob ? "0.1rem 1.5rem" : ".1rem .5rem"}
            >
              <InputBase placeholder="Search..." />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween> : <></>}

        </FlexBetween>

        {/* RIGHT SIDE */}
        <FlexBetween gap={isNonMob ? '1.5rem' : ".5rem"}>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          {protecte ?
            <IconButton >
              <Link component={RouterLink} to="/setting" color={theme.palette.primary[100]} ><SettingsOutlined  sx={{ fontSize: "25px" , mt:"3px" }} /></Link> 
            </IconButton>
            : <></>
          }


          {protecte ?
            <FlexBetween>
              <Button onClick={handleClick}
                id="basic-button"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: isNonMob ? "1rem" : ".5rem"
                }} >
                <Avatar src="" />

                {isNonMob ? <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize=".9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography fontSize=".8rem" sx={{ color: theme.palette.secondary[200] }} >
                    {user?.occupation}
                  </Typography>
                </Box> : ""}

                <ArrowDropDownOutlined sx={{ color: theme.palette.secondary[300], fontSize: "25px" }} />
              </Button>
              <Menu
                id="basic-button"
                anchorEl={anchors}
                open={isOpen}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              >
                <MenuItem onClick={Logout}>Log Out</MenuItem>
              </Menu>

            </FlexBetween> : ""}

        </FlexBetween>
      </Toolbar>
    </AppBar>

  )
}
