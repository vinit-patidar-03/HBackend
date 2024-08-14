const express = require('express');
const connectToDB = require('./db');
require('dotenv').config({
    path: 'src/config/.env'
});
const cors = require('cors');
const app = express();
const port = 3000 || process.env.PORT;

connectToDB();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/v1', require('./routes/auth'));
app.use('/api/v1', require('./routes/room'));
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});