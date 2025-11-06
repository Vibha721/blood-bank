# System Architecture

## 🏛️ High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │Dashboard │  │  Donors  │  │Inventory │  │ Requests │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│  ┌──────────┐  ┌──────────┐                                 │
│  │  Drives  │  │ Register │                                 │
│  └──────────┘  └──────────┘                                 │
│                                                               │
│              React 19 + Vite + TailwindCSS                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ HTTP/REST API
                        │ (localhost:5173 → localhost:5000)
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                      API LAYER (Express.js)                  │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              API Routes & Controllers                │    │
│  │                                                       │    │
│  │  /api/donors      /api/requests                      │    │
│  │  /api/inventory   /api/drives                        │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              Middleware Layer                        │    │
│  │  • CORS         • Body Parser                        │    │
│  │  • Error Handler • Validation                        │    │
│  └─────────────────────────────────────────────────────┘    │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        │ Mongoose ODM
                        │
┌───────────────────────▼─────────────────────────────────────┐
│                    DATABASE LAYER (MongoDB)                  │
│                                                               │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │  donors  │  │ requests │  │inventory │  │  drives  │    │
│  │collection│  │collection│  │collection│  │collection│    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
│                                                               │
│              MongoDB (localhost:27017/bloodbank)             │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Data Flow

### Example: Register a New Donor

```
User Action (Browser)
    │
    ▼
Register.jsx Component
    │
    ├─ Form Validation
    ├─ State Management (useState)
    │
    ▼
API Call (api.js)
    │
    ├─ POST /api/donors
    ├─ JSON payload
    │
    ▼
Express Backend
    │
    ├─ Route: donors.js
    ├─ Validation
    │
    ▼
Mongoose Model
    │
    ├─ Donor.js schema
    ├─ Data validation
    │
    ▼
MongoDB Database
    │
    ├─ Insert document
    ├─ Generate _id
    │
    ▼
Response Flow (reverse)
    │
    ├─ Return saved donor
    ├─ Status 201 Created
    │
    ▼
Frontend Update
    │
    ├─ Success message
    ├─ Navigate to /donors
    └─ Display new donor in list
```

## 📁 Directory Structure

```
BloodBankSystem/
│
├── 📂 src/                          # Frontend source
│   ├── 📂 api/
│   │   └── api.js                   # API integration layer
│   ├── 📂 pages/
│   │   ├── Dashboard.jsx            # Main dashboard
│   │   ├── Donors.jsx               # Donor management
│   │   ├── Register.jsx             # Donor registration
│   │   ├── Inventory.jsx            # Inventory tracking
│   │   ├── Requests.jsx             # Request management
│   │   └── Drives.jsx               # Drive management
│   ├── 📂 Components/
│   │   └── Layout.jsx               # App layout wrapper
│   ├── App.jsx                      # Main app component
│   └── main.jsx                     # Entry point
│
├── 📂 backend/                      # Backend source
│   ├── 📂 models/
│   │   ├── Donor.js                 # Donor schema
│   │   ├── Request.js               # Request schema
│   │   ├── Inventory.js             # Inventory schema
│   │   └── Drive.js                 # Drive schema
│   ├── 📂 routes/
│   │   ├── donors.js                # Donor routes
│   │   ├── requests.js              # Request routes
│   │   ├── inventory.js             # Inventory routes
│   │   └── drives.js                # Drive routes
│   ├── 📂 config/
│   │   └── database.js              # MongoDB connection
│   ├── server.js                    # Express server
│   ├── seed.js                      # Sample data seeder
│   └── package.json                 # Backend dependencies
│
├── 📂 public/                       # Static assets
├── 📄 .env                          # Frontend config
├── 📄 package.json                  # Frontend dependencies
└── 📚 Documentation files
```

## 🔌 API Architecture

### RESTful Endpoints Pattern

```
Resource: /api/{resource}

GET    /api/{resource}           → List all
GET    /api/{resource}/:id       → Get one
POST   /api/{resource}           → Create
PUT    /api/{resource}/:id       → Update
DELETE /api/{resource}/:id       → Delete

Special endpoints:
GET    /api/{resource}/stats/summary
GET    /api/{resource}/filter/{criteria}
GET    /api/{resource}/search/{query}
```

### Request/Response Flow

```
Client Request
    │
    ├─ HTTP Method (GET/POST/PUT/DELETE)
    ├─ Headers (Content-Type: application/json)
    ├─ Body (JSON payload)
    │
    ▼
Express Middleware Chain
    │
    ├─ CORS Check
    ├─ Body Parser
    ├─ Route Matching
    │
    ▼
Route Handler
    │
    ├─ Input Validation
    ├─ Business Logic
    ├─ Database Operation
    │
    ▼
Response
    │
    ├─ Status Code (200, 201, 400, 404, 500)
    ├─ JSON Data
    └─ Error Message (if any)
```

## 🗄️ Database Schema Relationships

```
┌─────────────────┐
│     Donor       │
├─────────────────┤
│ _id             │◄─────────┐
│ firstName       │          │
│ lastName        │          │
│ bloodType       │          │ Reference
│ lastDonation    │          │ (Logical)
│ donationCount   │          │
└─────────────────┘          │
                             │
┌─────────────────┐          │
│   Inventory     │          │
├─────────────────┤          │
│ _id             │          │
│ bloodType       │◄─────────┤
│ units           │          │
│ expiryBatches[] │          │
└─────────────────┘          │
                             │
┌─────────────────┐          │
│    Request      │          │
├─────────────────┤          │
│ _id             │          │
│ patient         │          │
│ bloodType       │◄─────────┘
│ units           │
│ status          │
└─────────────────┘

┌─────────────────┐
│     Drive       │
├─────────────────┤
│ _id             │
│ name            │
│ location        │
│ date            │
│ expectedDonors  │
│ actualDonors    │
└─────────────────┘

Note: Relationships are logical, not enforced by foreign keys
```

## 🔐 Security Architecture

```
┌─────────────────────────────────────────┐
│         Security Layers                  │
├─────────────────────────────────────────┤
│                                          │
│  1. Environment Variables                │
│     • Sensitive data in .env files       │
│     • Not committed to version control   │
│                                          │
│  2. CORS Protection                      │
│     • Whitelist allowed origins          │
│     • Prevent unauthorized access        │
│                                          │
│  3. Input Validation                     │
│     • Mongoose schema validation         │
│     • Required field checks              │
│     • Data type enforcement              │
│                                          │
│  4. Error Handling                       │
│     • Sanitized error messages           │
│     • No sensitive data in responses     │
│     • Proper HTTP status codes           │
│                                          │
│  5. MongoDB Protection                   │
│     • Mongoose ODM prevents injection    │
│     • Schema-based validation            │
│                                          │
└─────────────────────────────────────────┘
```

## 🚀 Deployment Architecture

### Development Environment

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   Backend    │────▶│   MongoDB    │
│ localhost:   │     │ localhost:   │     │ localhost:   │
│    5173      │     │    5000      │     │   27017      │
└──────────────┘     └──────────────┘     └──────────────┘
```

### Production Environment (Suggested)

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Frontend   │────▶│   Backend    │────▶│   MongoDB    │
│   (Vercel/   │     │  (Railway/   │     │   (Atlas)    │
│   Netlify)   │     │   Render)    │     │              │
└──────────────┘     └──────────────┘     └──────────────┘
```

## 📊 Component Hierarchy

```
App.jsx
│
├── Router
│   │
│   └── Layout.jsx
│       │
│       ├── Sidebar/Navigation
│       │
│       └── Routes
│           │
│           ├── Dashboard.jsx
│           │   ├── Stats Cards
│           │   ├── Pie Chart (Recharts)
│           │   ├── Donor Table
│           │   └── Alerts
│           │
│           ├── Donors.jsx
│           │   ├── Search Bar
│           │   └── Donor Table
│           │
│           ├── Register.jsx
│           │   └── Registration Form
│           │
│           ├── Inventory.jsx
│           │   ├── Blood Type Cards
│           │   └── Expiry Table
│           │
│           ├── Requests.jsx
│           │   ├── Filter Buttons
│           │   └── Request Table
│           │
│           └── Drives.jsx
│               ├── Upcoming Drives
│               └── Past Drives
```

## 🔄 State Management

```
Component Level State (useState)
    │
    ├─ Form data
    ├─ Loading states
    ├─ Error messages
    ├─ Local UI state
    │
    ▼
API Calls (useEffect)
    │
    ├─ Fetch data on mount
    ├─ Update on user actions
    ├─ Refresh on demand
    │
    ▼
Server State
    │
    └─ MongoDB database
```

## 🎨 Styling Architecture

```
TailwindCSS Utility Classes
    │
    ├─ Responsive design (sm:, md:, lg:)
    ├─ Color system (rose, gray, green, red)
    ├─ Spacing utilities (p-, m-, gap-)
    ├─ Flexbox/Grid layouts
    │
    └─ Custom configurations
        │
        └─ tailwind.config.js
```

## 📈 Performance Considerations

- **Frontend**: Vite for fast builds and HMR
- **Backend**: Express.js for efficient routing
- **Database**: MongoDB indexes on frequently queried fields
- **API**: Parallel requests with Promise.all()
- **UI**: Loading states for better UX
- **Caching**: Browser caching for static assets

---

**This architecture supports:**
- ✅ Scalability
- ✅ Maintainability
- ✅ Security
- ✅ Performance
- ✅ Developer experience
