require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// write in a .env (same level as server.js, package.json and so on) 
// file following (after = your Database URL without quotationmarks)
// DATABASE_URL = 
mongoose.connect(process.env.DATABASE_URL, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Successfully connected to database'));
app.use(express.json());

const deviceRouter = require('./routes/devices');
app.use('/devices', deviceRouter);


app.listen(3000, () => {
    console.log('Listening on 3000');
});