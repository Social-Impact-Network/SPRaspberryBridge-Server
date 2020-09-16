const express = require('express');
const router = express.Router();
const Device = require('../models/device')

// Getting all
router.get('/', async (req, res) => {
    try {
        const device = await Device.find();
        res.json(device)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});
// Getting one
router.get('/:id', getDevice, (req, res) => {
    // res.send(res.device.name);
    res.json(res.device);
});
// Creating one
router.post('/', async (req, res) => {
    const device = new Device({
        name: req.body.name,
        location:
        req.body.location,
        energyOutput: req.body.energyOutput
    });

    console.log(req.body);

    try {
        const newDevice = await device.save();
        res.status(201).json(newDevice);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});
// Updating one
router.patch('/:id', getDevice, async (req, res) => {
    if (req.body.name != null) {
        res.device.name = req.body.name;
        
    }    
    if (req.body.location != null) {
        res.device.name = req.body.energyOutput;

    }  
    try {
        const updatedDevice = await res.device.save();
        res.json(updatedDevice)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
});
// Deleting one
router.delete('/:id', getDevice, async (req, res) => {
    try {
        await res.device.remove();
        res.json({ message: 'Deleted Device' });
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

// middleware
async function getDevice(req, res, next) {
    let device;
    try {
        device = await Device.findById(req.params.id);
        if (device == null) {
            return res.status(404).json({ message: 'Cannot find device' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.device = device;
    next();
}

module.exports = router;