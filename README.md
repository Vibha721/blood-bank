## Blood Bank Management System

Full‑stack blood bank management system built with **React (Vite)** on the frontend and **Node.js / Express / MongoDB** on the backend.

This repo contains:
- `BloodBankSystem/` – main app (frontend + backend)
- Root `package.json` – optional workspace wrapper

---

## Project Structure

- `BloodBankSystem/`
  - `src/` – React frontend (pages, components, API client)
  - `backend/` – Express + MongoDB API
  - `ARCHITECTURE.md`, `PROJECT_SUMMARY.md` – detailed design docs

You will typically work inside `BloodBankSystem/`.

---

## Prerequisites

- Node.js 18+ (recommended)
- npm (comes with Node)
- MongoDB:
  - either **local MongoDB** (default: `mongodb://localhost:27017/bloodbank`), or
  - a **MongoDB Atlas** cluster.

---

## Backend Setup (`BloodBankSystem/backend`)

1. **Install dependencies**

```bash
cd BloodBankSystem/backend
npm install
```

2. **Create `.env`**

Create `BloodBankSystem/backend/.env` with either local or Atlas config.

**Local MongoDB example:**

```env
MONGODB_URI=mongodb://localhost:27017/bloodbank
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

**MongoDB Atlas example (adjust to your cluster):**

```env
MONGODB_URI=mongodb+srv://<username>:<password>@blood.z0jsrw8.mongodb.net/bloodbank?retryWrites=true&w=majority
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

3. **Run the backend**

```bash
cd BloodBankSystem/backend
npm run dev        # nodemon (auto‑reload)
# or
npm start          # plain node
```

Backend will be available at `http://localhost:5000` with API base `http://localhost:5000/api`.

---

## Frontend Setup (`BloodBankSystem/`)

1. **Install dependencies**

```bash
cd BloodBankSystem
npm install
```

2. **Frontend environment**

Create `BloodBankSystem/.env` (or `.env.local`) to point the frontend to the backend:

```env
VITE_API_URL=http://localhost:5000/api
```

3. **Run the frontend**

```bash
cd BloodBankSystem
npm run dev
```

By default Vite runs at `http://localhost:5173`.

---

## Key Flows

- **Register Donor**
  - Frontend page: `src/pages/Register.jsx`
  - API call: `addDonor` in `src/api/api.js`
  - Backend route: `backend/routes/donors.js` (`POST /api/donors`)

- **View Donors**
  - Frontend page: `src/pages/Donors.jsx`
  - API call: `fetchDonors` in `src/api/api.js`
  - Backend route: `GET /api/donors`

---

## Common Issues & Fixes

- **MongoDB connection error (`uri ... undefined`)**
  - Ensure `MONGODB_URI` is set correctly in `backend/.env`.

- **SRV lookup errors (`querySrv ENOTFOUND ...`)**
  - Double‑check the Atlas hostname (e.g. `blood.z0jsrw8.mongodb.net`) matches what Atlas shows.
  - Make sure your IP is whitelisted in Atlas Network Access.

- **Frontend cannot load donors / add donor**
  - Confirm:
    - Backend is running on `PORT=5000`
    - `VITE_API_URL` matches `http://localhost:5000/api`

---

## Scripts (Quick Reference)

From `BloodBankSystem/backend`:
- `npm run dev` – start backend with nodemon
- `npm start` – start backend with node
- `npm run seed` – seed database (if implemented)

From `BloodBankSystem`:
- `npm run dev` – start React frontend
- `npm run build` – production build

---

## License

This project is for learning and demo purposes. Adapt and extend as needed.


