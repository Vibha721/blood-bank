# Testing Guide

This guide will help you test all features of the Blood Bank Management System.

## Quick Start with Sample Data

To quickly populate your database with sample data for testing:

```bash
cd backend
npm run seed
```

This will add:
- 5 sample donors
- 4 sample blood requests
- Complete inventory for all blood types
- 4 sample donation drives (2 upcoming, 2 completed)

## Manual Testing Checklist

### 1. Dashboard Testing

**What to test:**
- [ ] Dashboard loads without errors
- [ ] Statistics cards show correct numbers
- [ ] Blood type distribution chart displays
- [ ] Recent donors list appears
- [ ] Low stock alerts show (if any)
- [ ] Upcoming drives display

**How to test:**
1. Navigate to `http://localhost:5173`
2. Verify all data loads correctly
3. Check that numbers match your database

---

### 2. Donor Management Testing

**Registration (Add Donor):**
- [ ] Navigate to "Add Donor" or Register page
- [ ] Fill out all required fields
- [ ] Submit the form
- [ ] Verify success message
- [ ] Check donor appears in Donors list

**Sample Test Data:**
```
First Name: Test
Last Name: Donor
Contact: 9876543210
Address: 123 Test Street
DOB: 1995-01-01
Blood Type: A+
Weight: 70
Gender: Male
Emergency Name: Emergency Contact
Emergency Phone: 1234567890
Medical History: None
```

**View Donors:**
- [ ] Navigate to Donors page
- [ ] Verify all donors display
- [ ] Test search functionality (by name)
- [ ] Test search functionality (by blood type)
- [ ] Check donor count is accurate

**Delete Donor:**
- [ ] Click delete on a donor
- [ ] Confirm deletion
- [ ] Verify donor is removed from list

---

### 3. Inventory Testing

**View Inventory:**
- [ ] Navigate to Inventory page
- [ ] Verify all 8 blood types display
- [ ] Check unit counts are correct
- [ ] Verify color coding (red=low, yellow=medium, green=good)

**Check Expiring Batches:**
- [ ] Scroll to "Expiring Soon" section
- [ ] Verify batches are sorted by expiry date
- [ ] Check urgent items (< 7 days) are highlighted in red

**Test Refresh:**
- [ ] Click Refresh button
- [ ] Verify data reloads

---

### 4. Request Management Testing

**View Requests:**
- [ ] Navigate to Requests page
- [ ] Verify all requests display
- [ ] Check request count

**Filter Requests:**
- [ ] Click "All" filter - see all requests
- [ ] Click "Pending" filter - see only pending
- [ ] Click "Fulfilled" filter - see only fulfilled

**Update Request Status:**
- [ ] Find a pending request
- [ ] Change status dropdown to "Fulfilled"
- [ ] Verify status updates immediately
- [ ] Try changing to "Cancelled"

**Delete Request:**
- [ ] Click delete on a request
- [ ] Confirm deletion
- [ ] Verify request is removed

---

### 5. Drives Management Testing

**View Drives:**
- [ ] Navigate to Drives page
- [ ] Verify upcoming drives section
- [ ] Verify past drives section
- [ ] Check drive counts

**Update Drive Status:**
- [ ] Find an upcoming drive
- [ ] Change status to "Ongoing"
- [ ] Verify it updates
- [ ] Change to "Completed"
- [ ] Verify it moves to Past Drives section

**Delete Drive:**
- [ ] Click delete on a drive
- [ ] Confirm deletion
- [ ] Verify drive is removed

---

## API Testing with curl

### Test Donors API

```bash
# Get all donors
curl http://localhost:5000/api/donors

# Get donor by ID (replace with actual ID)
curl http://localhost:5000/api/donors/YOUR_DONOR_ID

# Create a new donor
curl -X POST http://localhost:5000/api/donors \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "API",
    "lastName": "Test",
    "contact": "5555555555",
    "address": "API Test Address",
    "dob": "1990-01-01",
    "bloodType": "O+",
    "weight": 75,
    "gender": "Male",
    "emergencyName": "Emergency",
    "emergencyPhone": "1111111111"
  }'

# Get donor statistics
curl http://localhost:5000/api/donors/stats/summary

# Search by blood type
curl http://localhost:5000/api/donors/search/bloodtype/O+
```

### Test Inventory API

```bash
# Get all inventory
curl http://localhost:5000/api/inventory

# Get specific blood type
curl http://localhost:5000/api/inventory/A+

# Add inventory
curl -X POST http://localhost:5000/api/inventory \
  -H "Content-Type: application/json" \
  -d '{
    "bloodType": "A+",
    "units": 10,
    "expiryDate": "2025-06-01",
    "donationDate": "2025-01-15"
  }'

# Get low stock alerts
curl http://localhost:5000/api/inventory/alerts/low-stock?threshold=30

# Get expiring batches
curl http://localhost:5000/api/inventory/alerts/expiring?days=30

# Initialize inventory (first time setup)
curl -X POST http://localhost:5000/api/inventory/initialize
```

### Test Requests API

```bash
# Get all requests
curl http://localhost:5000/api/requests

# Create a new request
curl -X POST http://localhost:5000/api/requests \
  -H "Content-Type: application/json" \
  -d '{
    "patient": "Test Patient",
    "bloodType": "B+",
    "units": 2,
    "hospital": "Test Hospital",
    "contactNumber": "9999999999",
    "urgency": "High",
    "notes": "Test request"
  }'

# Get pending requests only
curl http://localhost:5000/api/requests/filter/pending

# Get request statistics
curl http://localhost:5000/api/requests/stats/summary

# Update request status (replace with actual ID)
curl -X PUT http://localhost:5000/api/requests/YOUR_REQUEST_ID \
  -H "Content-Type: application/json" \
  -d '{"status": "Fulfilled"}'
```

### Test Drives API

```bash
# Get all drives
curl http://localhost:5000/api/drives

# Create a new drive
curl -X POST http://localhost:5000/api/drives \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Drive",
    "location": "Test Location",
    "date": "2025-12-01",
    "time": "10:00 AM",
    "organizer": "Test Organizer",
    "contactNumber": "8888888888",
    "expectedDonors": 50,
    "description": "Test drive description"
  }'

# Get upcoming drives only
curl http://localhost:5000/api/drives/filter/upcoming

# Get drive statistics
curl http://localhost:5000/api/drives/stats/summary
```

---

## Testing Scenarios

### Scenario 1: Complete Donor Registration Flow
1. Click "Add Donor" button
2. Fill out complete form
3. Submit
4. Verify success message
5. Navigate to Donors page
6. Search for the new donor
7. Verify all details are correct

### Scenario 2: Handle Blood Request
1. Navigate to Requests page
2. Note a pending request for specific blood type
3. Navigate to Inventory
4. Check if that blood type is available
5. Go back to Requests
6. Change request status to "Fulfilled"
7. Verify status updates

### Scenario 3: Monitor Low Stock
1. Navigate to Dashboard
2. Check for low stock alerts
3. Navigate to Inventory
4. Identify blood types with < 30 units
5. Verify they appear in alerts

### Scenario 4: Manage Donation Drive
1. Navigate to Drives page
2. Check upcoming drives
3. Update a drive status to "Ongoing"
4. Later update to "Completed"
5. Verify it moves to Past Drives section

---

## Performance Testing

### Load Testing
- Add 100+ donors and verify page performance
- Create 50+ requests and test filtering
- Check dashboard load time with large dataset

### Browser Testing
Test on:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Responsive Testing
Test on different screen sizes:
- [ ] Desktop (1920x1080)
- [ ] Laptop (1366x768)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)

---

## Error Handling Testing

### Test Backend Down
1. Stop the backend server
2. Try to load any page
3. Verify error messages display
4. Restart backend
5. Click refresh - should work

### Test Invalid Data
1. Try to register donor with invalid phone
2. Try to create request with 0 units
3. Try to add inventory with negative units

### Test Network Errors
1. Disconnect internet
2. Try to perform actions
3. Verify appropriate error messages

---

## Automated Testing (Optional)

You can add automated tests using:
- **Frontend**: Jest + React Testing Library
- **Backend**: Mocha/Chai or Jest
- **E2E**: Cypress or Playwright

---

## Test Results Template

```
Date: ___________
Tester: ___________

Dashboard: ✓ / ✗
Donor Registration: ✓ / ✗
Donor List: ✓ / ✗
Inventory View: ✓ / ✗
Request Management: ✓ / ✗
Drive Management: ✓ / ✗
API Endpoints: ✓ / ✗

Issues Found:
1. _________________
2. _________________
3. _________________

Notes:
_____________________
_____________________
```

---

## Troubleshooting

**Problem**: Data not loading
- **Solution**: Check browser console for errors, verify backend is running

**Problem**: Can't add donor
- **Solution**: Check all required fields are filled, verify backend connection

**Problem**: Inventory not updating
- **Solution**: Click refresh button, check MongoDB connection

**Problem**: Search not working
- **Solution**: Clear search field and try again, check for typos

---

## Next Steps After Testing

1. ✅ All features working
2. 📝 Document any bugs found
3. 🔧 Fix critical issues
4. 🚀 Ready for deployment
5. 📊 Monitor production usage

Happy Testing! 🧪
