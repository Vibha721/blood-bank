import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'csv-parse';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import Donor from '../models/Donor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

function normalizeGender(g) {
  if (!g) return undefined;
  const s = String(g).trim().toLowerCase();
  if (s.startsWith('m')) return 'Male';
  if (s.startsWith('f')) return 'Female';
  return 'Other';
}

function normalizeBloodType(bt) {
  if (!bt) return undefined;
  const s = String(bt).trim().toUpperCase();
  const allowed = ['A+','A-','B+','B-','O+','O-','AB+','AB-'];
  return allowed.includes(s) ? s : undefined;
}

function toNumber(v) {
  if (v === undefined || v === null || v === '') return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

function toDate(v) {
  if (!v) return undefined;
  const d = new Date(v);
  return isNaN(d.getTime()) ? undefined : d;
}

async function run() {
  const csvPathArg = process.argv[2];
  if (!csvPathArg) {
    console.error('Usage: node scripts/import_donors_csv.js <path/to/donors.csv>');
    process.exit(1);
  }

  const csvPath = path.isAbsolute(csvPathArg)
    ? csvPathArg
    : path.resolve(process.cwd(), csvPathArg);

  if (!fs.existsSync(csvPath)) {
    console.error(`CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    console.error('MONGODB_URI not set. Please set it in backend/.env');
    process.exit(1);
  }

  console.log(`Connecting to MongoDB...`);
  await mongoose.connect(mongoUri);
  console.log(`Connected.`);

  console.log(`Reading CSV: ${csvPath}`);
  const records = [];

  await new Promise((resolve, reject) => {
    fs.createReadStream(csvPath)
      .pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
          trim: true,
        })
      )
      .on('data', (row) => {
        const doc = {
          firstName: row.firstName || row.first_name || row.firstname || row['First Name'],
          lastName: row.lastName || row.last_name || row.lastname || row['Last Name'],
          contact: row.contact || row.phone || row.mobile || row['Contact'],
          address: row.address || row['Address'],
          dob: toDate(row.dob || row.birthdate || row['DOB'] || row['Date of Birth']),
          bloodType: normalizeBloodType(row.bloodType || row['Blood Type'] || row['blood_group'] || row['bloodType']),
          weight: toNumber(row.weight || row['Weight (kg)'] || row['weight_kg']),
          gender: normalizeGender(row.gender || row['Gender']),
          emergencyName: row.emergencyName || row['Emergency Contact Name'] || row['emergency_name'],
          emergencyPhone: row.emergencyPhone || row['Emergency Contact Phone'] || row['emergency_phone'],
          medicalHistory: row.medicalHistory || row['Medical History'] || '',
          status: row.status || 'Active',
          lastDonation: toDate(row.lastDonation || row['Last Donation'] || row['last_donation']),
          donationCount: toNumber(row.donationCount || row['Donation Count'] || row['donation_count']) ?? 0,
        };

        // Basic required-field validation
        if (!doc.firstName || !doc.lastName || !doc.contact || !doc.address || !doc.dob || !doc.bloodType || !doc.weight || !doc.gender || !doc.emergencyName || !doc.emergencyPhone) {
          console.warn('Skipping row due to missing required fields:', row);
          return;
        }
        if (!doc.bloodType) {
          console.warn('Skipping row due to invalid blood type:', row.bloodType);
          return;
        }
        records.push(doc);
      })
      .on('error', reject)
      .on('end', resolve);
  });

  console.log(`Parsed ${records.length} valid donor records. Inserting...`);
  try {
    const result = await Donor.insertMany(records, { ordered: false });
    console.log(`Inserted ${result.length} donors.`);
  } catch (err) {
    // ordered:false means we still insert valid docs; capture how many succeeded
    console.error('Insert completed with some errors:', err.writeErrors?.length || err.message);
  }

  await mongoose.disconnect();
  console.log('Done.');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
