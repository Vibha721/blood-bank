# 🚀 Quick Start Guide

Get your Blood Bank System running in 5 minutes!

## ⚡ Super Quick Setup

### 1️⃣ Install Dependencies (2 minutes)

```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2️⃣ Start MongoDB (30 seconds)

**Option A - Local MongoDB:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows
net start MongoDB
```

**Option B - MongoDB Atlas:**
- Update `backend/.env` with your Atlas connection string

### 3️⃣ Start Backend (30 seconds)

```bash
cd backend
npm run dev
```

✅ You should see: `Server is running on port 5000` and `MongoDB Connected`

### 4️⃣ Start Frontend (30 seconds)

Open a **new terminal**:
```bash
npm run dev
```

✅ You should see: `Local: http://localhost:5173`

### 5️⃣ Add Sample Data (1 minute)

Open a **new terminal**:
```bash
cd backend
npm run seed
```

✅ This adds 5 donors, 4 requests, full inventory, and 4 drives

### 6️⃣ Open Application

Visit: **http://localhost:5173**

🎉 **Done! Your Blood Bank System is running!**

---

## 📋 Quick Commands Reference

| Task | Command |
|------|---------|
| Start Frontend | `npm run dev` |
| Start Backend | `cd backend && npm run dev` |
| Add Sample Data | `cd backend && npm run seed` |
| Build Frontend | `npm run build` |
| Initialize Inventory | `curl -X POST http://localhost:5000/api/inventory/initialize` |

---

## 🔍 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Backend won't start | Check MongoDB is running |
| Port 5000 in use | Change PORT in `backend/.env` |
| Frontend can't connect | Ensure backend is running on port 5000 |
| No data showing | Run `npm run seed` in backend folder |
| MongoDB error | Check connection string in `backend/.env` |

---

## 🎯 First Steps After Setup

1. **View Dashboard** - See overview and statistics
2. **Add a Donor** - Click "Add Donor" button
3. **Check Inventory** - Navigate to Inventory page
4. **Create Request** - Go to Requests page
5. **Schedule Drive** - Visit Drives page

---

## 📱 Access Points

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health**: http://localhost:5000/health
- **API Docs**: http://localhost:5000

---

## 🔑 Default Configuration

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

**Backend (backend/.env):**
```env
MONGODB_URI=mongodb://localhost:27017/bloodbank
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

---

## 🧪 Quick API Test

```bash
# Test if backend is working
curl http://localhost:5000/health

# Get all donors
curl http://localhost:5000/api/donors

# Get inventory
curl http://localhost:5000/api/inventory
```

---

## 📚 Need More Help?

- **Full Setup**: See [SETUP.md](./SETUP.md)
- **Testing Guide**: See [TESTING.md](./TESTING.md)
- **API Docs**: See [backend/README.md](./backend/README.md)
- **Project Info**: See [README.md](./README.md)

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] MongoDB running
- [ ] Frontend dependencies installed
- [ ] Backend dependencies installed
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Sample data loaded
- [ ] Application accessible in browser

---

**🎉 Happy Coding!**

*If you encounter any issues, check the troubleshooting section or refer to the detailed documentation.*
