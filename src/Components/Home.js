import { useState } from 'react'
import ProminentAppBar from './ProminentAppBar'
import { Button, TextField, Box } from '@mui/material'

const Home = () => {
    const [message, setMessage] = useState('');

    const submitMessage = () => {

    }

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    }

    return (
        <>
            <ProminentAppBar />
            <Box style={{ height: "80vh", width: "100vw", display: "flex", flexDirection: "column", alignItems: "center" }} mt={3}>

                <form style={{ display: "flex", flexDirection: "column", width: "50vw", maxWidth: "900px", alignItems: "center" }}>
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
                    <Button type='submit' variant="contained" onClick={submitMessage}>Save Message</Button>
                </form>
            </Box>
        </>
    )
}

export default Home