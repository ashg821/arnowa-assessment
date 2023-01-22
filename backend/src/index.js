const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");

require('dotenv').config();


const routes = require('./routes');
const port = parseInt(process.env.PORT, 10);
const url = process.env.URL;


app.use(express.json());
app.use(cors());

mongoose.connect(url).then(() => console.log('Connected to mongoDB')).catch(() => console.log('Failed to connect to mongodb'));

app.use('/api', routes);


app.listen(port, () => {
    console.log('Server listening on port ' + port);
})