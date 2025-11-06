import express from 'express';
import Drive from '../models/Drive.js';

const router = express.Router();

// Get all drives
router.get('/', async (req, res) => {
  try {
    const drives = await Drive.find().sort({ date: -1 });
    res.json(drives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get drive by ID
router.get('/:id', async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) {
      return res.status(404).json({ message: 'Drive not found' });
    }
    res.json(drive);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new drive
router.post('/', async (req, res) => {
  const drive = new Drive({
    name: req.body.name,
    location: req.body.location,
    date: req.body.date,
    time: req.body.time,
    organizer: req.body.organizer,
    contactNumber: req.body.contactNumber,
    expectedDonors: req.body.expectedDonors || 0,
    description: req.body.description || ''
  });

  try {
    const newDrive = await drive.save();
    res.status(201).json(newDrive);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update drive
router.put('/:id', async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) {
      return res.status(404).json({ message: 'Drive not found' });
    }

    Object.keys(req.body).forEach(key => {
      drive[key] = req.body[key];
    });

    const updatedDrive = await drive.save();
    res.json(updatedDrive);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete drive
router.delete('/:id', async (req, res) => {
  try {
    const drive = await Drive.findById(req.params.id);
    if (!drive) {
      return res.status(404).json({ message: 'Drive not found' });
    }
    await drive.deleteOne();
    res.json({ message: 'Drive deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get upcoming drives
router.get('/filter/upcoming', async (req, res) => {
  try {
    const upcomingDrives = await Drive.find({
      status: { $in: ['Upcoming', 'Ongoing'] }
    }).sort({ date: 1 });
    res.json(upcomingDrives);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get drives statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalDrives = await Drive.countDocuments();
    const upcomingDrives = await Drive.countDocuments({ status: 'Upcoming' });
    const completedDrives = await Drive.countDocuments({ status: 'Completed' });

    res.json({
      totalDrives,
      upcomingDrives,
      completedDrives
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
