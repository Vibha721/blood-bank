import mongoose from 'mongoose';

const driveSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  organizer: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  expectedDonors: {
    type: Number,
    default: 0
  },
  actualDonors: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'],
    default: 'Upcoming'
  },
  description: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Drive = mongoose.model('Drive', driveSchema);

export default Drive;
