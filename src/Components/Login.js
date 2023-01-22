import { Box, TextField, Button, Typography } from "@mui/material"
import ProminentAppBar from './ProminentAppBar';
import { useEffect, useState } from 'react';
import axios from "axios";
import uri from '../config/config'
import { useNavigate } from 'react-router-dom';


const Login = ({ setAllUsers, changeLoginType }) => {
    const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });

    const navigate = useNavigate();


    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            if (formData.name === "admin" && formData.email === "admin@admin.com" && formData.mobile === "0000000000") {
                console.log('admin');
                changeLoginType('admin');
                const { data } = await axios.post(`${uri}/user/all`, { ...formData });
                setAllUsers(data.allUsers);
                navigate('/home');

            }
            else {
                changeLoginType('user');
                const { data } = await axios.post(`${uri}/user/login`, { ...formData, startedAt: new Date() });
                localStorage.setItem('tokenInfo', JSON.stringify(data.tokenInfo));
                navigate('/home');

            }
        } catch (error) {
            
        }

    }

    const verifyToken = async (token) => {
        try {
            const { data } = await axios.put(`${uri}/user/verifyToken`, {}, { headers: { 'Authorization': `Bearer ${token}` } });
            if (data.message === "Continue Session") navigate('/home');

        } catch (error) {
            if (error.response) {
                if (error.response.status === 403) localStorage.removeItem('tokenInfo');
            }
        }
    }

    useEffect(() => {
        const tokenInfo = JSON.parse(localStorage.getItem('tokenInfo'));
        if (tokenInfo) {
            verifyToken(tokenInfo.token);
        }
    }, []);

    return (
        <>
            <ProminentAppBar type='login' />
            <Box style={{ height: "80vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h3" gutterBottom mt={3}>
                    Login
                </Typography>

                <form
                    style={{ display: "flex", flexDirection: "column", width: "500px", height: "50vh", maxHeight: "800px", justifyContent: "space-around", border: "1px solid gray", borderRadius: "5px", padding: "30px" }}
                    onSubmit={handleFormSubmit}
                >
                    <TextField required label="Name" name="name" onChange={handleChange} value={formData.name} />
                    <TextField required label="Email" type="email" name="email" onChange={handleChange} value={formData.email} />
                    <TextField required type="tel" label="Mobile Number" inputProps={{ pattern: "[0-9]{10}" }} helperText="Must be 10 digits" name="mobile" onChange={handleChange} value={formData.mobile} />
                    <Box style={{ display: "flex", justifyContent: "center" }}>
                        <Button variant="contained" type="submit">SUBMIT</Button>
                    </Box>
                </form>
            </Box>
        </>
    )
}

export default Login