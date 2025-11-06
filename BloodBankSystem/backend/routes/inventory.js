import express from 'express';
import Inventory from '../models/Inventory.js';

const router = express.Router();

// Get all inventory
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find().sort({ bloodType: 1 });
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get inventory by blood type
router.get('/:bloodType', async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ bloodType: req.params.bloodType });
    if (!inventory) {
      return res.status(404).json({ message: 'Blood type not found in inventory' });
    }
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create or update inventory
router.post('/', async (req, res) => {
  try {
    const { bloodType, units, expiryDate, donationDate } = req.body;

    let inventory = await Inventory.findOne({ bloodType });

    if (inventory) {
      // Update existing inventory
      inventory.units += units;
      if (expiryDate) {
        inventory.expiryBatches.push({
          units,
          expiryDate,
          donationDate: donationDate || new Date()
        });
      }
      inventory.lastUpdated = new Date();
    } else {
      // Create new inventory entry
      inventory = new Inventory({
        bloodType,
        units,
        expiryBatches: expiryDate ? [{
          units,
          expiryDate,
          donationDate: donationDate || new Date()
        }] : []
      });
    }

    const savedInventory = await inventory.save();
    res.status(201).json(savedInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update inventory units
router.put('/:bloodType', async (req, res) => {
  try {
    const inventory = await Inventory.findOne({ bloodType: req.params.bloodType });
    if (!inventory) {
      return res.status(404).json({ message: 'Blood type not found in inventory' });
    }

    if (req.body.units !== undefined) {
      inventory.units = req.body.units;
    }
    
    inventory.lastUpdated = new Date();
    const updatedInventory = await inventory.save();
    res.json(updatedInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Decrease inventory (when blood is used)
router.post('/:bloodType/use', async (req, res) => {
  try {
    const { units } = req.body;
    const inventory = await Inventory.findOne({ bloodType: req.params.bloodType });
    
    if (!inventory) {
      return res.status(404).json({ message: 'Blood type not found in inventory' });
    }

    if (inventory.units < units) {
      return res.status(400).json({ message: 'Insufficient units in inventory' });
    }

    inventory.units -= units;
    inventory.lastUpdated = new Date();
    
    const updatedInventory = await inventory.save();
    res.json(updatedInventory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get low stock alerts
router.get('/alerts/low-stock', async (req, res) => {
  try {
    const threshold = req.query.threshold || 30;
    const lowStock = await Inventory.find({ units: { $lt: threshold } });
    res.json(lowStock);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get expiring soon batches
router.get('/alerts/expiring', async (req, res) => {
  try {
    const daysThreshold = req.query.days || 7;
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + parseInt(daysThreshold));

    const inventory = await Inventory.find({
      'expiryBatches.expiryDate': { $lte: expiryDate }
    });

    const expiringBatches = [];
    inventory.forEach(item => {
      item.expiryBatches.forEach(batch => {
        if (batch.expiryDate <= expiryDate) {
          expiringBatches.push({
            bloodType: item.bloodType,
            units: batch.units,
            expiryDate: batch.expiryDate
          });
        }
      });
    });

    res.json(expiringBatches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Initialize inventory with all blood types
router.post('/initialize', async (req, res) => {
  try {
    const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
    const inventoryItems = [];

    for (const bloodType of bloodTypes) {
      const existing = await Inventory.findOne({ bloodType });
      if (!existing) {
        const inventory = new Inventory({
          bloodType,
          units: 0,
          expiryBatches: []
        });
        inventoryItems.push(await inventory.save());
      }
    }

    res.status(201).json({
      message: 'Inventory initialized',
      items: inventoryItems
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
