# Blood Bank Management System

A comprehensive web application for managing blood bank operations including donor registration, blood inventory tracking, request management, and donation drive organization.

## Features

- **Donor Management** - Register and manage blood donors with complete profiles
- **Inventory Tracking** - Real-time blood inventory management with expiry tracking
- **Request Management** - Handle blood requests from hospitals and patients
- **Drive Organization** - Plan and manage blood donation drives
- **Analytics Dashboard** - Visual insights with charts and statistics
- **Alert System** - Low stock and expiring blood alerts
- **Search & Filter** - Easy search by blood type, status, and more

## Tech Stack

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB

## Project Structure

```
BloodBankSystem/
├── src/                    # Frontend source code
│   ├── api/               # API integration
│   ├── Components/        # React components
│   ├── pages/            # Page components
│   └── ...
├── backend/               # Backend source code
│   ├── config/           # Configuration files
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── server.js         # Main server file
├── public/               # Static assets
└── ...
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd BloodBankSystem
```

2. **Install Frontend Dependencies**
```bash
npm install
```

3. **Install Backend Dependencies**
```bash
cd backend
npm install
```

4. **Configure Environment Variables**

Create a `.env` file in the `backend` directory:
```env
MONGODB_URI=mongodb://localhost:27017/bloodbank
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

Update the root `.env` file (already exists):
```env
VITE_API_URL=http://localhost:5000/api
```

5. **Start MongoDB**

For local MongoDB:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

Or use MongoDB Atlas (cloud) - see backend README for details.

### Running the Application

1. **Start the Backend Server**
```bash
cd backend
npm run dev
```
The backend will run on `http://localhost:5000`

2. **Start the Frontend (in a new terminal)**
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

3. **Initialize the Database** (first time only)

Initialize inventory with all blood types:
```bash
curl -X POST http://localhost:5000/api/inventory/initialize
```

### Access the Application

Open your browser and navigate to `http://localhost:5173`

## API Documentation

See the [Backend README](./backend/README.md) for detailed API documentation.

### Quick API Overview

- **Donors**: `/api/donors`
- **Requests**: `/api/requests`
- **Inventory**: `/api/inventory`
- **Drives**: `/api/drives`

## MongoDB Setup Options

### Option 1: Local MongoDB
Install MongoDB locally and use: `mongodb://localhost:27017/bloodbank`

### Option 2: MongoDB Atlas (Recommended for production)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in backend `.env`

## Development

### Frontend Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

### Backend Development
```bash
cd backend
npm run dev          # Start with nodemon (auto-reload)
npm start            # Start production server
```

## Features in Detail

### Dashboard
- Overview of total donors, blood units, pending requests
- Blood type distribution chart
- Critical alerts for low stock
- Recent donor activity

### Donor Registration
- Complete donor profile with medical history
- Blood type validation
- Emergency contact information
- Automatic status tracking

### Inventory Management
- Real-time blood unit tracking
- Expiry date management
- Low stock alerts
- Blood type categorization

### Request Management
- Hospital/patient blood requests
- Urgency levels
- Status tracking (Pending/Fulfilled/Cancelled)
- Request history

### Donation Drives
- Schedule and organize drives
- Track expected vs actual donors
- Location and contact management
- Status updates

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

MIT

## Support

For issues and questions, please open an issue in the repository.