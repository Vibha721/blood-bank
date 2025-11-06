import mongoose from 'mongoose';

const requestSchema = new mongoose.Schema({
  patient: {
    type: String,
    required: true,
    trim: true
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  },
  units: {
    type: Number,
    required: true,
    default: 1
  },
  hospital: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  urgency: {
    type: String,
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  status: {
    type: String,
    enum: ['Pending', 'Fulfilled', 'Cancelled'],
    default: 'Pending'
  },
  requestDate: {
    type: Date,
    default: Date.now
  },
  fulfilledDate: {
    type: Date
  },
  notes: {
    type: String,
    default: ''
  }
});

const Request = mongoose.model('Request', requestSchema);

export default Request;
