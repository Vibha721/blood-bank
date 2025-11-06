import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Donor from './models/Donor.js';
import Request from './models/Request.js';
import Inventory from './models/Inventory.js';
import Drive from './models/Drive.js';

dotenv.config();

const sampleDonors = [
  {
    donor_id: "DON001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    password: "password123",
    contact_number: "1234567890",
    city: "New York",
    blood_group: "O+",
    availability: "Available",
    months_since_first_donation: 24,
    number_of_donation: 5,
    pints_donated: 2.5,
    contact: "1234567890",
    address: "123 Main St, City",
    dob: new Date("1990-05-15"),
    bloodType: "O+",
    weight: 75,
    gender: "Male",
    emergencyName: "Jane Doe",
    emergencyPhone: "0987654321",
    medicalHistory: "None",
    status: "Active",
    lastDonation: new Date("2024-12-01"),
    donationCount: 5
  },
  {
    donor_id: "DON002",
    firstName: "Alice",
    lastName: "Smith",
    email: "alice.smith@email.com",
    password: "password123",
    contact_number: "2345678901",
    city: "Los Angeles",
    blood_group: "A+",
    availability: "Available",
    months_since_first_donation: 36,
    number_of_donation: 8,
    pints_donated: 4.0,
    contact: "2345678901",
    address: "456 Oak Ave, Town",
    dob: new Date("1988-08-22"),
    bloodType: "A+",
    weight: 62,
    gender: "Female",
    emergencyName: "Bob Smith",
    emergencyPhone: "1234509876",
    medicalHistory: "None",
    status: "Active",
    lastDonation: new Date("2024-11-15"),
    donationCount: 8
  },
  {
    donor_id: "DON003",
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@email.com",
    password: "password123",
    contact_number: "3456789012",
    city: "Chicago",
    blood_group: "B+",
    availability: "Busy",
    months_since_first_donation: 12,
    number_of_donation: 3,
    pints_donated: 1.5,
    contact: "3456789012",
    address: "789 Pine Rd, Village",
    dob: new Date("1995-03-10"),
    bloodType: "B+",
    weight: 80,
    gender: "Male",
    emergencyName: "Sarah Johnson",
    emergencyPhone: "2345610987",
    medicalHistory: "Allergies to penicillin",
    status: "Active",
    lastDonation: new Date("2024-10-20"),
    donationCount: 3
  },
  {
    donor_id: "DON004",
    firstName: "Emma",
    lastName: "Wilson",
    email: "emma.wilson@email.com",
    password: "password123",
    contact_number: "4567890123",
    city: "Houston",
    blood_group: "AB+",
    availability: "Unavailable",
    months_since_first_donation: 6,
    number_of_donation: 2,
    pints_donated: 1.0,
    contact: "4567890123",
    address: "321 Elm St, City",
    dob: new Date("1992-11-30"),
    bloodType: "AB+",
    weight: 58,
    gender: "Female",
    emergencyName: "David Wilson",
    emergencyPhone: "3456721098",
    medicalHistory: "None",
    status: "Pending",
    lastDonation: new Date("2024-09-05"),
    donationCount: 2
  },
  {
    donor_id: "DON005",
    firstName: "Robert",
    lastName: "Brown",
    email: "robert.brown@email.com",
    password: "password123",
    contact_number: "5678901234",
    city: "Phoenix",
    blood_group: "O-",
    availability: "Available",
    months_since_first_donation: 60,
    number_of_donation: 12,
    pints_donated: 6.0,
    contact: "5678901234",
    address: "654 Maple Dr, Town",
    dob: new Date("1985-07-18"),
    bloodType: "O-",
    weight: 85,
    gender: "Male",
    emergencyName: "Linda Brown",
    emergencyPhone: "4567832109",
    medicalHistory: "None",
    status: "Active",
    lastDonation: new Date("2024-12-10"),
    donationCount: 12
  }
];

const sampleRequests = [
  {
    patient: "Emily Davis",
    bloodType: "A+",
    units: 2,
    hospital: "City General Hospital",
    contactNumber: "6789012345",
    urgency: "High",
    status: "Pending",
    notes: "Surgery scheduled for tomorrow"
  },
  {
    patient: "James Martinez",
    bloodType: "O+",
    units: 3,
    hospital: "St. Mary's Medical Center",
    contactNumber: "7890123456",
    urgency: "Critical",
    status: "Pending",
    notes: "Emergency case"
  },
  {
    patient: "Sophia Garcia",
    bloodType: "B+",
    units: 1,
    hospital: "Community Hospital",
    contactNumber: "8901234567",
    urgency: "Medium",
    status: "Fulfilled",
    fulfilledDate: new Date("2024-12-15"),
    notes: "Regular transfusion"
  },
  {
    patient: "William Rodriguez",
    bloodType: "AB+",
    units: 2,
    hospital: "University Medical Center",
    contactNumber: "9012345678",
    urgency: "Low",
    status: "Pending",
    notes: "Scheduled procedure next week"
  }
];

const sampleInventory = [
  { bloodType: "A+", units: 150, expiryBatches: [
    { units: 50, expiryDate: new Date("2025-03-15"), donationDate: new Date("2024-12-15") },
    { units: 100, expiryDate: new Date("2025-04-20"), donationDate: new Date("2025-01-20") }
  ]},
  { bloodType: "A-", units: 45, expiryBatches: [
    { units: 45, expiryDate: new Date("2025-03-25"), donationDate: new Date("2024-12-25") }
  ]},
  { bloodType: "B+", units: 120, expiryBatches: [
    { units: 60, expiryDate: new Date("2025-03-10"), donationDate: new Date("2024-12-10") },
    { units: 60, expiryDate: new Date("2025-04-15"), donationDate: new Date("2025-01-15") }
  ]},
  { bloodType: "B-", units: 18, expiryBatches: [
    { units: 18, expiryDate: new Date("2025-03-05"), donationDate: new Date("2024-12-05") }
  ]},
  { bloodType: "O+", units: 180, expiryBatches: [
    { units: 80, expiryDate: new Date("2025-03-20"), donationDate: new Date("2024-12-20") },
    { units: 100, expiryDate: new Date("2025-04-25"), donationDate: new Date("2025-01-25") }
  ]},
  { bloodType: "O-", units: 25, expiryBatches: [
    { units: 25, expiryDate: new Date("2025-03-30"), donationDate: new Date("2024-12-30") }
  ]},
  { bloodType: "AB+", units: 35, expiryBatches: [
    { units: 35, expiryDate: new Date("2025-04-05"), donationDate: new Date("2025-01-05") }
  ]},
  { bloodType: "AB-", units: 12, expiryBatches: [
    { units: 12, expiryDate: new Date("2025-03-12"), donationDate: new Date("2024-12-12") }
  ]}
];

const sampleDrives = [
  {
    name: "City Hospital Blood Drive",
    location: "City Hospital Main Hall",
    date: new Date("2025-11-15"),
    time: "09:00 AM",
    organizer: "Dr. Sarah Johnson",
    contactNumber: "1112223333",
    expectedDonors: 100,
    actualDonors: 0,
    status: "Upcoming",
    description: "Annual blood donation drive at City Hospital"
  },
  {
    name: "University Campus Drive",
    location: "University Student Center",
    date: new Date("2025-11-22"),
    time: "10:00 AM",
    organizer: "Student Health Services",
    contactNumber: "4445556666",
    expectedDonors: 150,
    actualDonors: 0,
    status: "Upcoming",
    description: "Semester blood donation event for students and staff"
  },
  {
    name: "Community Center Drive",
    location: "Downtown Community Center",
    date: new Date("2024-12-01"),
    time: "08:00 AM",
    organizer: "Red Cross Volunteer Team",
    contactNumber: "7778889999",
    expectedDonors: 80,
    actualDonors: 92,
    status: "Completed",
    description: "Monthly community blood drive"
  },
  {
    name: "Corporate Office Drive",
    location: "Tech Corp Headquarters",
    date: new Date("2024-11-20"),
    time: "11:00 AM",
    organizer: "HR Department",
    contactNumber: "0001112222",
    expectedDonors: 60,
    actualDonors: 58,
    status: "Completed",
    description: "Employee wellness initiative"
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing data...');
    await Donor.deleteMany({});
    await Request.deleteMany({});
    await Inventory.deleteMany({});
    await Drive.deleteMany({});
    console.log('Existing data cleared');

    // Insert sample data
    console.log('Inserting sample donors...');
    await Donor.insertMany(sampleDonors);
    console.log(`✓ ${sampleDonors.length} donors added`);

    console.log('Inserting sample requests...');
    await Request.insertMany(sampleRequests);
    console.log(`✓ ${sampleRequests.length} requests added`);

    console.log('Inserting sample inventory...');
    await Inventory.insertMany(sampleInventory);
    console.log(`✓ ${sampleInventory.length} inventory items added`);

    console.log('Inserting sample drives...');
    await Drive.insertMany(sampleDrives);
    console.log(`✓ ${sampleDrives.length} drives added`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSummary:');
    console.log(`- Donors: ${sampleDonors.length}`);
    console.log(`- Requests: ${sampleRequests.length}`);
    console.log(`- Inventory Items: ${sampleInventory.length}`);
    console.log(`- Drives: ${sampleDrives.length}`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
