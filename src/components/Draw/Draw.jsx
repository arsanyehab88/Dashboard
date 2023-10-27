import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import FlexBetween from '../FlexBetween/FlexBetween.jsx';
import { InputBase } from '@mui/material';
import { DarkModeOutlined, LightModeOutlined, Search, SettingsOutlined } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { setMode } from '../../state/index.js';

function Draw({ open, setOpen, theme , isNonMob , drawerWidth}) {

    const dispatch = useDispatch()

    



    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));


    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box >
            <CssBaseline />
            <AppBar position="fixed" sx={{
                background: "none",
                boxShadow: "none"
            }} open={open}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    {/*                     <IconButton
                        color="white"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        Persistent drawer
                    </Typography> */}
                    {/*left side */}
                    <FlexBetween>
                        <IconButton color="white"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}>
                            <MenuIcon />
                        </IconButton>
                        <FlexBetween
                            background={theme.palette.background.alt}
                            borderRadius="9px"
                            gap="3rem"
                            p="0.1rem 1.5rem"
                        >
                            <InputBase placeholder='search...' />
                            <IconButton>
                                <Search />
                            </IconButton>
                        </FlexBetween>
                    </FlexBetween>

                    {/*right side */}
                    <FlexBetween gap="1.5rem">
                        <IconButton onClick={() => dispatch(setMode())}>
                            {theme.palette.mode === "dark" ? (
                                <DarkModeOutlined sx={{ fontSize: "25px" }} />
                            ) : (
                                <LightModeOutlined sx={{ fontSize: "25px" }} />
                            )}
                        </IconButton>
                        <IconButton>
                            <SettingsOutlined sx={{ fontSize: "25px" }} />
                        </IconButton>
                    </FlexBetween>
                </Toolbar>
            </AppBar>
            <Drawer

                open={open}
                variant='persistent'
                anchor='left'
                sx={{
                    width: drawerWidth,
                    "& .MuiDrawer-paper": {
                        color: theme.palette.secondary[200],
                        backgroundColor: theme.palette.background.alt,
                        boxSizing: "border-box",
                        borderWidth: isNonMob ? 0 : "2px",
                        width: drawerWidth
                    }
                }}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

        </Box>
    )
}

export default Draw