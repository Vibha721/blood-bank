# Blood Bank Management System - Backend

This is the backend API for the Blood Bank Management System built with Node.js, Express, and MongoDB.

## Features

- **Donor Management**: Register, update, delete, and search donors
- **Request Management**: Handle blood requests from hospitals/patients
- **Inventory Management**: Track blood units by type with expiry dates
- **Drive Management**: Organize and manage blood donation drives
- **Real-time Statistics**: Get insights on donors, requests, and inventory
- **Alert System**: Low stock and expiring blood alerts

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env` (or create a new `.env` file)
   - Update the MongoDB connection string in `.env`:

```env
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/bloodbank

# For MongoDB Atlas
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bloodbank?retryWrites=true&w=majority

PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

## Running the Server

### Development Mode (with auto-reload):
```bash
npm run dev
```

### Production Mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Donors
- `GET /api/donors` - Get all donors
- `GET /api/donors/:id` - Get donor by ID
- `POST /api/donors` - Create new donor
- `PUT /api/donors/:id` - Update donor
- `DELETE /api/donors/:id` - Delete donor
- `GET /api/donors/search/bloodtype/:bloodType` - Search by blood type
- `GET /api/donors/stats/summary` - Get donor statistics

### Requests
- `GET /api/requests` - Get all requests
- `GET /api/requests/:id` - Get request by ID
- `POST /api/requests` - Create new request
- `PUT /api/requests/:id` - Update request
- `DELETE /api/requests/:id` - Delete request
- `GET /api/requests/filter/pending` - Get pending requests
- `GET /api/requests/stats/summary` - Get request statistics

### Inventory
- `GET /api/inventory` - Get all inventory
- `GET /api/inventory/:bloodType` - Get inventory by blood type
- `POST /api/inventory` - Add/update inventory
- `PUT /api/inventory/:bloodType` - Update inventory units
- `POST /api/inventory/:bloodType/use` - Decrease inventory (when used)
- `GET /api/inventory/alerts/low-stock` - Get low stock alerts
- `GET /api/inventory/alerts/expiring` - Get expiring batches
- `POST /api/inventory/initialize` - Initialize inventory with all blood types

### Drives
- `GET /api/drives` - Get all drives
- `GET /api/drives/:id` - Get drive by ID
- `POST /api/drives` - Create new drive
- `PUT /api/drives/:id` - Update drive
- `DELETE /api/drives/:id` - Delete drive
- `GET /api/drives/filter/upcoming` - Get upcoming drives
- `GET /api/drives/stats/summary` - Get drive statistics

## MongoDB Setup

### Option 1: Local MongoDB

1. Install MongoDB on your system
2. Start MongoDB service:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

3. Use connection string: `mongodb://localhost:27017/bloodbank`

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Whitelist your IP address (or use 0.0.0.0/0 for development)
5. Get your connection string and update `.env`

## Initialize Database

After starting the server, you can initialize the inventory:

```bash
curl -X POST http://localhost:5000/api/inventory/initialize
```

This will create entries for all blood types (A+, A-, B+, B-, O+, O-, AB+, AB-).

## Project Structure

```
backend/
├── config/
│   └── database.js       # MongoDB connection
├── models/
│   ├── Donor.js         # Donor schema
│   ├── Request.js       # Request schema
│   ├── Inventory.js     # Inventory schema
│   └── Drive.js         # Drive schema
├── routes/
│   ├── donors.js        # Donor routes
│   ├── requests.js      # Request routes
│   ├── inventory.js     # Inventory routes
│   └── drives.js        # Drive routes
├── .env                 # Environment variables
├── server.js            # Main server file
└── package.json         # Dependencies
```

## Testing the API

You can test the API using:
- **Postman** or **Insomnia** for API testing
- **curl** commands
- The frontend application

Example curl command:
```bash
# Get all donors
curl http://localhost:5000/api/donors

# Create a new donor
curl -X POST http://localhost:5000/api/donors \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "contact": "1234567890",
    "address": "123 Main St",
    "dob": "1990-01-01",
    "bloodType": "O+",
    "weight": 70,
    "gender": "Male",
    "emergencyName": "Jane Doe",
    "emergencyPhone": "0987654321"
  }'
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Internal Server Error

## CORS Configuration

CORS is enabled for the frontend URL specified in `.env` (`CORS_ORIGIN`). Update this if your frontend runs on a different port.

## License

MIT
