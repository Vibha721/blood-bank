import express from 'express';
import Request from '../models/Request.js';

const router = express.Router();

// Get all requests
router.get('/', async (req, res) => {
  try {
    const requests = await Request.find().sort({ requestDate: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get request by ID
router.get('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    res.json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new request
router.post('/', async (req, res) => {
  const request = new Request({
    patient: req.body.patient,
    bloodType: req.body.bloodType,
    units: req.body.units || 1,
    hospital: req.body.hospital,
    contactNumber: req.body.contactNumber,
    urgency: req.body.urgency || 'Medium',
    notes: req.body.notes || ''
  });

  try {
    const newRequest = await request.save();
    res.status(201).json(newRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update request
router.put('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    Object.keys(req.body).forEach(key => {
      request[key] = req.body[key];
    });

    if (req.body.status === 'Fulfilled' && !request.fulfilledDate) {
      request.fulfilledDate = new Date();
    }

    const updatedRequest = await request.save();
    res.json(updatedRequest);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete request
router.delete('/:id', async (req, res) => {
  try {
    const request = await Request.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }
    await request.deleteOne();
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get pending requests
router.get('/filter/pending', async (req, res) => {
  try {
    const pendingRequests = await Request.find({ status: 'Pending' });
    res.json(pendingRequests);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get requests statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const totalRequests = await Request.countDocuments();
    const pendingRequests = await Request.countDocuments({ status: 'Pending' });
    const fulfilledRequests = await Request.countDocuments({ status: 'Fulfilled' });

    res.json({
      totalRequests,
      pendingRequests,
      fulfilledRequests
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
