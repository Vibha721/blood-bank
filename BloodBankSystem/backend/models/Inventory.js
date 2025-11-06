import mongoose from 'mongoose';

const inventorySchema = new mongoose.Schema({
  bloodType: {
    type: String,
    required: true,
    unique: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  },
  units: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  expiryBatches: [{
    units: {
      type: Number,
      required: true
    },
    expiryDate: {
      type: Date,
      required: true
    },
    donationDate: {
      type: Date,
      default: Date.now
    }
  }]
});

const Inventory = mongoose.model('Inventory', inventorySchema);

export default Inventory;
