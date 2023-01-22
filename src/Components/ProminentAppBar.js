import * as React from 'react';
import { styled } from '@mui/material/styles';

import { AppBar, Box, Button, Toolbar } from '@mui/material';
import axios from 'axios';
import uri from '../config/config';
import { useNavigate } from 'react-router-dom';







const StyledToolbar = styled(Toolbar)(({ theme }) => ({
    alignItems: 'flex-start',
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(2),
    // Override media queries injected by theme.mixins.toolbar
    '@media all': {
        minHeight: 45,
    }
}));

export default function ProminentAppBar({ type, loginType }) {
    const navigate = useNavigate();
    const handleLogout = async () => {
        if (loginType == 'user') {
            await axios.put(`${uri}/user/logout`, {}, { headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenInfo')).token}` } });
            localStorage.removeItem('tokenInfo');
            navigate('/login');
        } else {
            navigate('/login');

        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" style={{ backgroundColor: "rgba(255, 0, 0, 0.7)" }}>
                <StyledToolbar style={{ justifyContent: "flex-end" }}>
                    {type === 'home' && <Button color='secondary' onClick={handleLogout}>LOGOUT</Button>}

                </StyledToolbar>
            </AppBar>
        </Box>
    );
}