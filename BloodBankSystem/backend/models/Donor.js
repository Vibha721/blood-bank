import mongoose from 'mongoose';

const donorSchema = new mongoose.Schema({
  donor_id: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  contact_number: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  blood_group: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  },
  availability: {
    type: String,
    enum: ['Available', 'Busy', 'Unavailable'],
    default: 'Available'
  },
  months_since_first_donation: {
    type: Number,
    default: 0
  },
  number_of_donation: {
    type: Number,
    default: 0
  },
  pints_donated: {
    type: Number,
    default: 0
  },
  // Keep existing fields for backward compatibility
  contact: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  bloodType: {
    type: String,
    required: true,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']
  },
  weight: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other']
  },
  emergencyName: {
    type: String,
    required: true
  },
  emergencyPhone: {
    type: String,
    required: true
  },
  medicalHistory: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Inactive'],
    default: 'Active'
  },
  lastDonation: {
    type: Date,
    default: Date.now
  },
  donationCount: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Donor = mongoose.model('Donor', donorSchema);

export default Donor;
