import { useEffect, useState } from 'react'
import ProminentAppBar from './ProminentAppBar'
import { Button, TextField, Box } from '@mui/material'
import axios from 'axios';
import uri from '../config/config';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const Home = ({ allUsers, loginType }) => {
    const [message, setMessage] = useState('');
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const getUser = async () => {

        const { data } = await axios.get(`${uri}/user/info`, { headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenInfo')).token}` } });
        setUser(data.user);
    }

    const submitMessage = async (event) => {
        event.preventDefault();
        try {
            const messageString = message.trim();
            if (messageString === "") enqueueSnackbar('Enter atleast 1 character', { variant: 'warning' });
            else {
                const { data } = await axios.put(`${uri}/user/addMessage`, { message: messageString }, { headers: { 'Authorization': `Bearer ${JSON.parse(localStorage.getItem('tokenInfo')).token}` } });
                setUser(data.user);
                setMessage("");
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
        if (loginType !== 'admin') {
            const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
            if (tokenInfo) {
                verifyToken(tokenInfo.token, tokenInfo.expires);
                getUser();

            }
            else {
                navigate('/login');
            }

        }
    }, []);

    return (
        <>
            <ProminentAppBar type="home" loginType={loginType}/>
            {loginType === 'user' && <>
                <Box style={{ height: "60vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center" }} mt={3}>

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

                <table>
                    <thead>
                        <tr>
                            <th>Session Number</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Duration</th>
                            <th>Messages</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            user.sessions?.map((session, index) => (<tr key={index}>
                                <td>{index + 1}</td>
                                <td>{new Date(session.startedAt).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</td>
                                <td>{new Date(session.endedAt).toLocaleString(undefined, { timeZone: 'Asia/Kolkata' })}</td>
                                <td>{session.endedAt == null ? "Session Active" : `${((new Date(session.endedAt).getTime() - new Date(session.startedAt).getTime()) / 60000).toFixed(2)} mins`}</td>
                                <td>{session.messages.join(", ")}</td>
                            </tr>))
                        }
                    </tbody>
                </table>
            </>}
            {
                loginType === 'admin' && <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile Number</th>
                            <th>Messages</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers?.map((user, index) => (<tr key={index}>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                                <td>{user.sessions?.map((session, index)=>(<span key = {index}>{session.messages.join(", ")}</span>))}</td>
                            </tr>))
                        }
                    </tbody>
                </table>
            }
        </>
    )
}

export default Home