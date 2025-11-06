import express from 'express';
import Donor from '../models/Donor.js';

const router = express.Router();

// Get all donors
router.get('/', async (req, res) => {
  try {
    const donors = await Donor.find().sort({ createdAt: -1 });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get donor by ID
router.get('/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    res.json(donor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new donor
router.post('/', async (req, res) => {
  const donor = new Donor({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    contact: req.body.contact,
    address: req.body.address,
    dob: req.body.dob,
    bloodType: req.body.bloodType,
    weight: req.body.weight,
    gender: req.body.gender,
    emergencyName: req.body.emergencyName,
    emergencyPhone: req.body.emergencyPhone,
    medicalHistory: req.body.medicalHistory || ''
  });

  try {
    const newDonor = await donor.save();
    res.status(201).json(newDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update donor
router.put('/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }

    Object.keys(req.body).forEach(key => {
      donor[key] = req.body[key];
    });

    const updatedDonor = await donor.save();
    res.json(updatedDonor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete donor
router.delete('/:id', async (req, res) => {
  try {
    const donor = await Donor.findById(req.params.id);
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found' });
    }
    await donor.deleteOne();
    res.json({ message: 'Donor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search donors by blood type
router.get('/search/bloodtype/:bloodType', async (req, res) => {
  try {
    const donors = await Donor.find({ bloodType: req.params.bloodType });
    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get donor statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalDonors = await Donor.countDocuments();
    const activeDonors = await Donor.countDocuments({ status: 'Active' });
    const bloodTypeStats = await Donor.aggregate([
      {
        $group: {
          _id: '$bloodType',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      totalDonors,
      activeDonors,
      bloodTypeDistribution: bloodTypeStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
