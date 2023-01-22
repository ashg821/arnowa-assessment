import { useEffect, useState } from 'react'
import ProminentAppBar from './ProminentAppBar'
import { Button, TextField, Box } from '@mui/material'
import axios from 'axios';
import uri from '../config/config';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Home = () => {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const submitMessage = async (event) => {
        event.preventDefault();
        try {
            const messageString = message.trim();
            if (messageString === "") enqueueSnackbar('Enter atleast 1 character', { variant: 'warning' });
            else {
                const { data } = await axios.put(`${uri}/user/addMessage`, { message: messageString }, { headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenInfo')).token}` } });
                console.log(data);
            }
        } catch (error) {

        }
    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    const verifyToken = async (token, expires) => {
        try {
            const { data } = await axios.put(`${uri}/user/verifyToken`, {}, { headers: { 'Authorization': `Bearer ${token}` } });
            if (data.message === "Continue Session") {
                setTimeout(() => {
                    verifyToken(token, expires);
                }, (new Date(expires).getTime() - new Date().getTime()))
            }

        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) {
                    enqueueSnackbar('Session expired', { variant: "error" });
                    navigate('/login')
                };
            }
        }
    }

    useEffect(() => {
        const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
        if (tokenInfo) {
            verifyToken(tokenInfo.token, tokenInfo.expires);
        }
        else {
            navigate('/login')
        }
    }, []);

    return (
        <>
            <ProminentAppBar />
            <Box style={{ height: "80vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center" }} mt={3}>

                <form style={{ display: "flex", flexDirection: "column", width: "50vw", maxWidth: "900px", alignItems: "center" }} onSubmit={submitMessage}>
                    <TextField
                        id="outlined-multiline-static"
                        label="Enter message"
                        multiline
                        rows={10}
                        variant="outlined"
                        sx={{ width: "40vw" }}
                        value={message}
                        onChange={handleMessageChange}
                    />
                    <Button type='submit' variant="contained">Save Message</Button>
                </form>
            </Box>
        </>
    )
}

export default Home