require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const db = mongoose.connection;

// write in a .env-file (same level as server.js, package.json and so on) 
// following:
// DATABASE_URL=yourDatabaseURL
mongoose.connect(process.env.DATABASE_URL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
);
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Successfully connected to database'));
app.use(express.json());

const deviceRouter = require('./routes/devices');
app.use('/devices', deviceRouter);


app.listen(port, () => {
    console.log('Listening on '+ port);
});

module.exports = app;