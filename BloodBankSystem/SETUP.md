# Quick Setup Guide

Follow these steps to get your Blood Bank Management System up and running.

## Prerequisites Check

Make sure you have:
- ✅ Node.js (v14+) installed
- ✅ MongoDB installed locally OR MongoDB Atlas account
- ✅ npm or yarn package manager

## Step-by-Step Setup

### 1. Install Frontend Dependencies

```bash
npm install
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
cd ..
```

### 3. Configure MongoDB

**Option A: Local MongoDB**

1. Start MongoDB service:
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

2. The backend `.env` is already configured for local MongoDB:
```
MONGODB_URI=mongodb://localhost:27017/bloodbank
```

**Option B: MongoDB Atlas (Cloud)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use 0.0.0.0/0 for development)
5. Get your connection string
6. Update `backend/.env`:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/bloodbank?retryWrites=true&w=majority
```

### 4. Start the Backend Server

Open a terminal and run:

```bash
cd backend
npm run dev
```

You should see:
```
Server is running on port 5000
MongoDB Connected: ...
```

### 5. Initialize the Database

In a new terminal, run:

```bash
curl -X POST http://localhost:5000/api/inventory/initialize
```

This creates inventory entries for all blood types.

### 6. Start the Frontend

In another terminal (keep backend running):

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### 7. Access the Application

Open your browser and go to:
```
http://localhost:5173
```

## Testing the System

### Add Sample Data

1. **Register a Donor**: Click "Add Donor" and fill out the form
2. **Check Inventory**: Navigate to Inventory page
3. **Create a Request**: Go to Requests page
4. **Add a Drive**: Go to Drives page

### Test API Endpoints

```bash
# Get all donors
curl http://localhost:5000/api/donors

# Get inventory
curl http://localhost:5000/api/inventory

# Get requests
curl http://localhost:5000/api/requests

# Get drives
curl http://localhost:5000/api/drives
```

## Common Issues & Solutions

### Backend won't start
- **Issue**: MongoDB connection error
- **Solution**: Make sure MongoDB is running or check your connection string

### Frontend can't connect to backend
- **Issue**: CORS or network error
- **Solution**: Ensure backend is running on port 5000 and `.env` has correct API URL

### Port already in use
- **Issue**: Port 5000 or 5173 is busy
- **Solution**: 
  - Kill the process using the port
  - Or change the port in `backend/.env` (PORT=5001) and update frontend `.env`

### No data showing
- **Issue**: Database is empty
- **Solution**: Initialize inventory and add some sample data through the UI

## Project Structure

```
BloodBankSystem/
├── src/                    # Frontend React app
│   ├── api/api.js         # API integration
│   ├── pages/             # Page components
│   └── Components/        # Reusable components
├── backend/               # Backend Express app
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── config/           # Database config
│   └── server.js         # Main server
├── .env                  # Frontend environment variables
└── backend/.env          # Backend environment variables
```

## Next Steps

1. ✅ System is running
2. 📝 Add sample donors
3. 📦 Check inventory levels
4. 📋 Create blood requests
5. 🚐 Schedule donation drives
6. 📊 View dashboard analytics

## Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Check the backend [README.md](./backend/README.md) for API documentation
- Review error messages in the terminal
- Check browser console for frontend errors

## Production Deployment

For production deployment:
1. Build the frontend: `npm run build`
2. Set `NODE_ENV=production` in backend
3. Use a production MongoDB instance
4. Configure proper CORS settings
5. Use environment variables for sensitive data
6. Set up SSL/HTTPS

Happy coding! 🩸💻
