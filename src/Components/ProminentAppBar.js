import * as React from 'react';
import { styled } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
import { AppBar, Box, Toolbar, IconButton, Button } from '@mui/material';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import { MenuIcon, SearchIcon, MoreIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
// import SearchIcon from '@mui/icons-material/Search';
// import MoreIcon from '@mui/icons-material/MoreVert';




const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: 45,
    }
}));

export default function ProminentAppBar({type}) {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: "rgba(255, 0, 0, 0.7)" }}>
                <StyledToolbar>
                    {/* <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>


                    <IconButton size="large" aria-label="search" color="inherit">
                        <SearchIcon />
                    </IconButton>
                    <IconButton
                        size="large"
                        aria-label="display more actions"
                        edge="end"
                        color="inherit"
                    >
                        <MoreIcon />
                    </IconButton> */}
                   {/* { type === 'register' && <Link to="/login" style={{textDecoration: "none"}}><Button variant="text" color='secondary'>Login</Button></Link>} */}
                    
                </StyledToolbar>
            </AppBar>
        </Box>
    );
}