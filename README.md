## Blood Bank Management System

Full‑stack blood bank management system built with **React (Vite)** on the frontend and **Node.js / Express / MongoDB** on the backend.

The goal of this project is to provide a **complete donor–request–inventory workflow** for a blood bank:
- **Donors** can be registered and managed.
- **Blood requests** can be created and tracked.
- **Inventory** for each blood group can be monitored and adjusted.
- **Drives** (blood donation events) can be created and managed.

You can use this as:
- A learning project for MERN‑style apps.
- A starter kit for a real blood bank management tool (with customizations).

---

## Repository Layout

Top‑level structure:

- **`BloodBankSystem/`** – main app (frontend + backend)
  - `src/` – React frontend (Vite)
  - `backend/` – Express + MongoDB API
  - `ARCHITECTURE.md`, `PROJECT_SUMMARY.md`, `STATUS.md`, `TESTING.md` – in‑depth docs
- Root `package.json` – optional wrapper/workspace (you usually work only in `BloodBankSystem/`).

You will typically:
- Run the **frontend** from `BloodBankSystem/`.
- Run the **backend** from `BloodBankSystem/backend/`.

---

## Features

- **Donor Management**
  - **Register donors** with personal, medical, and emergency contact details.
  - Track **blood group**, **availability**, **donation history**, and **generated donor ID**.
  - View donors in a searchable, sortable table.
  - Delete donors.

- **Request Management**
  - Create and manage **blood requests**.
  - Track status (e.g., pending, approved, fulfilled).

- **Inventory Management**
  - Track **units per blood type**.
  - Update inventory when donations are added or units are used.
  - Low‑stock and expiring‑batches endpoints for alerts.

- **Drive Management**
  - Create, list, and update **blood donation drives**.
  - See upcoming drives and basic statistics.

- **Dashboards & Stats**
  - High‑level view of donors, requests, and inventory status.

---

## Tech Stack

- **Frontend**
  - **React** (with hooks)
  - **Vite** for dev server & build
  - **React Router** (for pages like Dashboard, Donors, Register, etc.)
  - **Tailwind CSS** + custom CSS (clean, modern UI)

- **Backend**
  - **Node.js** + **Express**
  - **MongoDB** with **Mongoose**
  - RESTful routes for donors, requests, inventory, and drives

---

## Prerequisites

- **Node.js** 18+ (recommended)
- **npm** (comes with Node)
- **MongoDB**:
  - **Option 1 – Local MongoDB** (default): `mongodb://localhost:27017/bloodbank`
  - **Option 2 – MongoDB Atlas** cluster:
    - Cluster created
    - Database user
    - IP whitelisted

---

## Backend Setup (`BloodBankSystem/backend`)

### 1. Install dependencies

```bash
cd BloodBankSystem/backend
npm install
```

### 2. Configure environment (`.env`)

Create `BloodBankSystem/backend/.env` with either local or Atlas configuration.

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

Notes:
- **`MONGODB_URI`** must be a valid URI. If it is missing, Mongoose will throw:  
  “The `uri` parameter to `openUri()` must be a string, got `undefined`”.
- **`CORS_ORIGIN`** should match the URL where the frontend runs (by default `http://localhost:5173`).

### 3. Run the backend

```bash
cd BloodBankSystem/backend
npm run dev        # nodemon (auto‑reload)
# or
npm start          # plain node
```

The backend will listen on:
- **Base URL**: `http://localhost:5000`
- **API base**: `http://localhost:5000/api`

### 4. API Overview

All endpoints are prefixed with `/api`.

- **Donors**
  - `GET /api/donors` – list all donors (most recent first).
  - `GET /api/donors/:id` – get a single donor.
  - `POST /api/donors` – create a donor.
  - `PUT /api/donors/:id` – update a donor.
  - `DELETE /api/donors/:id` – delete a donor.
  - `GET /api/donors/search/bloodtype/:bloodType` – filter by blood type.
  - `GET /api/donors/stats/summary` – donor stats (totals, distribution).

- **Requests**
  - `GET /api/requests`
  - `GET /api/requests/:id`
  - `POST /api/requests`
  - `PUT /api/requests/:id`
  - `DELETE /api/requests/:id`
  - `GET /api/requests/filter/pending`
  - `GET /api/requests/stats/summary`

- **Inventory**
  - `GET /api/inventory`
  - `GET /api/inventory/:bloodType`
  - `POST /api/inventory`
  - `PUT /api/inventory/:bloodType`
  - `POST /api/inventory/:bloodType/use`
  - `GET /api/inventory/alerts/low-stock`
  - `GET /api/inventory/alerts/expiring`
  - `POST /api/inventory/initialize` – seed all blood types.

- **Drives**
  - `GET /api/drives`
  - `GET /api/drives/:id`
  - `POST /api/drives`
  - `PUT /api/drives/:id`
  - `DELETE /api/drives/:id`
  - `GET /api/drives/filter/upcoming`
  - `GET /api/drives/stats/summary`

For more detail, see `backend/README.md` and the model definitions under `backend/models/`.

---

## Frontend Setup (`BloodBankSystem/`)

### 1. Install dependencies

```bash
cd BloodBankSystem
npm install
```

### 2. Configure frontend environment

Create `BloodBankSystem/.env` (or `.env.local`) to point the frontend to the backend:

```env
VITE_API_URL=http://localhost:5000/api
```

If you change the backend port or host, update `VITE_API_URL` accordingly.

### 3. Run the frontend

```bash
cd BloodBankSystem
npm run dev
```

Vite will print a URL similar to `http://localhost:5173`.  
Open that in your browser while the backend is running.

---

## Frontend Architecture

- **Entry**
  - `main.jsx` – mounts the React app.
  - `App.jsx` – top‑level layout & routes.

- **Pages (`src/pages`)**
  - `Dashboard.jsx` – high‑level summary.
  - `Donors.jsx` – searchable table of donors with delete support.
  - `Register.jsx` – donor registration form.
  - `Drives.jsx`, `Inventory.jsx`, `Requests.jsx` – management views.
  - `Login.jsx`, `Register.jsx` – auth/registration flows (UI level).

- **Components (`src/Components`)**
  - `Layout.jsx` – main shell with sidebar/content.
  - `Sidebar.jsx` – navigation items.
  - `DonorsList.jsx`, `DonorTable.jsx` – reusable donor displays.

- **API client (`src/api/api.js`)**
  - Wraps `fetch` calls to the backend.
  - Exposes functions like `fetchDonors`, `addDonor`, `fetchRequests`, `fetchInventory`, `fetchDrives`, etc.

---

## Data Model Overview

High‑level summary (see `backend/models/*.js` for full schemas):

- **Donor**
  - **Identity**: `donor_id` (auto‑generated if missing), `firstName`, `lastName`, `email`, `password`
  - **Contact**: `contact_number`, `city`, `address`, `contact`
  - **Blood Data**: `blood_group`, `bloodType`, `availability`
  - **History**: `months_since_first_donation`, `number_of_donation`, `pints_donated`, `donationCount`, `lastDonation`, `status`
  - **Emergency / Medical**: `emergencyName`, `emergencyPhone`, `medicalHistory`
  - **Meta**: `createdAt`

- **Request**
  - Patient / hospital details, blood type, quantity, status, timestamps.

- **Inventory**
  - Blood type, units available, expiry information, thresholds for alerts.

- **Drive**
  - Name, location, date/time, organizer, statistics about collected units.

---

## Example Flow: Register & View Donor

- **Register Donor**
  - **Frontend**
    - Page: `src/pages/Register.jsx`
    - On submit, builds a donor payload and calls `addDonor` from `src/api/api.js`.
  - **Backend**
    - Route: `POST /api/donors` in `backend/routes/donors.js`
    - Generates a unique `donor_id` if not provided.
    - Saves the donor via the `Donor` model.

- **View Donors**
  - **Frontend**
    - Page: `src/pages/Donors.jsx`
    - Calls `fetchDonors` on mount.
    - Supports text search across name, email, donor ID, city, blood group, and contact fields.
  - **Backend**
    - Route: `GET /api/donors`
    - Returns a list of donors sorted by `createdAt` (most recent first).

---

## Development Workflow

- **Starting both servers**

```bash
# Terminal 1 – backend
cd BloodBankSystem/backend
npm run dev

# Terminal 2 – frontend
cd BloodBankSystem
npm run dev
```

- **Code style / linting**
  - ESLint is configured in `BloodBankSystem/eslint.config.js`.
  - You can run linting from the frontend root (see `package.json` scripts).

- **Testing**
  - See `TESTING.md` for notes and future test plans.

---

## Troubleshooting

- **MongoDB connection error: `uri ... undefined`**
  - **Cause**: `MONGODB_URI` not set or mis‑spelled in `backend/.env`.
  - **Fix**: Ensure `.env` exists and `MONGODB_URI` is a valid connection string, then restart the backend.

- **`querySrv ENOTFOUND _mongodb._tcp.<cluster>.mongodb.net`**
  - **Cause**: Wrong Atlas hostname or DNS issue.
  - **Fix**:
    - Copy the exact connection string from Atlas.
    - Ensure the hostname (e.g. `blood.z0jsrw8.mongodb.net`) matches.
    - Make sure your IP is whitelisted in Atlas.

- **Frontend shows “Failed to load donors” / “Failed to add donor”**
  - **Check**:
    - Backend is running on `PORT=5000`.
    - `VITE_API_URL` in `BloodBankSystem/.env` matches `http://localhost:5000/api`.
    - Browser devtools → Network tab → inspect the failed request for status code and error JSON.

- **Port already in use**
  - Change `PORT` in `backend/.env` **and** update `VITE_API_URL` to the new port.

---

## Useful Scripts (Quick Reference)

- **From `BloodBankSystem/backend`**
  - `npm run dev` – start backend with nodemon.
  - `npm start` – start backend with node.
  - `npm run seed` – seed database (if configured).
  - `npm run import:donors` – import donors from CSV (see `scripts/import_donors_csv.js`).

- **From `BloodBankSystem`**
  - `npm run dev` – start React frontend.
  - `npm run build` – production build.

---

## Extending the Project

- **Add authentication & roles**
  - Implement real auth (JWT / sessions) for admin vs staff vs donor.
  - Lock down sensitive routes on the backend.

- **Enhance dashboards**
  - Add charts for donation trends, usage rate, and drive performance.

- **Notifications**
  - Email/SMS notifications for low inventory, upcoming drives, or expiring blood units.

---

## License

This project is for learning and demo purposes. Adapt and extend as needed for your own organization or coursework.



