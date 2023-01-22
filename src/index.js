import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';


const theme = createTheme({
    palette: {
        primary: {
            main: "rgba(255, 0, 0, 0.7)",
        },
        secondary: {
            main: "rgb(255, 255, 255)",
        }

    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <SnackbarProvider maxSnack={3}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </SnackbarProvider>
);



