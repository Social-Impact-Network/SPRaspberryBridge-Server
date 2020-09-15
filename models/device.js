const mongoose = require('mongoose')

const deviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    },
    energyOutput: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Device', deviceSchema);