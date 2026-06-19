# 🚀 EcomExperts Frontend Take-Home Assignment
 
> A responsive web application for **building and reviewing** a custom home security system.
 
---
 
## 🚀 Deployment
 

### 🎨 Frontend
- Deployed on **Vercel** *(Bonus)*
- 👉 Live Demo: [https://ecom-experts-frontend.vercel.app](https://ecom-experts-frontend.vercel.app)
### 🖥️ Backend
- Deployed as separate API *(Bonus)*
- 👉 API Base URL: [https://ecom-experts-backend.vercel.app](https://ecom-experts-backend.vercel.app)
---


## 🛠️ Tech Stack
 
### 🎨 Frontend
| Technology | Role |
|---|---|
| ⚛️ React 19 | UI Framework |
| 🔷 TypeScript | Type Safety |
| ⚡ Vite | Build Tool |
| 🎨 Tailwind CSS v4 | Styling |
| 🐻 Zustand | State Management |
| 🔄 TanStack Query | Data Fetching |
| 🍞 React Hot Toast | Notifications |
| 🎯 React Icons | Icon Library |
 
### 🖥️ Backend
| Technology | Role |
|---|---|
| 🟢 Node.js | Runtime |
| 🚂 Express.js | Server Framework |
| 📄 JSON Files | Mock Data |
 
---


 
## ✨ Features
 
### 🏗️ Bundle Builder
- 📋 **4-step accordion workflow**
- 📷 Camera, Plan, Sensor, and Accessory selection
- 🎨 Variant/color selection support
- ➕ Quantity steppers
- 🔢 Live selected-item counters
- 📱 Responsive design
### 📊 Review Panel
- ⚡ Real-time bundle summary
- 🗂️ Grouped items by category
- 🔄 **Quantity synchronization** with product cards
- 💰 Dynamic pricing calculations
- 💸 Savings calculation
### 🎨 Variant Handling
- Each product variant **maintains its own quantity**
- Switching variants does **not** affect previously selected variants
- Selected variants appear independently in the review panel
### 💾 Persistence
- **"Save my system for later"** functionality
- Configuration stored in `localStorage`
- State restored after page refresh or revisit
---
 
## 📁 Project Structure
 
```text
project/
│
├── backend/
│   ├── data/
│   ├── src/
│   │   ├── routes/
│   │   └── index.js
│   └── package.json
│
├── frontend/
│   ├── components/
│   ├── hooks/
│   ├── store/
│   ├── types/
│   ├── public/
│   ├── src/
│   │   └── App.tsx
│   └── package.json
│
└── README.md
```
 ---

## ⚙️ Environment Variables
 
### 🎨 Frontend
 
Create a `.env` file inside the `frontend/` directory:
 
```env
VITE_BACKEND_URL=http://localhost:3000
```
 ---
 
## 🚀 Getting Started
 
### 1️⃣ Clone Repository
 
```bash
git clone https://github.com/mohamedtarek45/EcomExperts.git
cd EcomExperts
```
 
### 2️⃣ Install Dependencies
 
**Frontend:**
```bash
cd frontend
npm install
```
 
**Backend:**
```bash
cd backend
npm install
```
 
### 3️⃣ Run Backend
 
```bash
cd backend
npm start
```
 
> 🌐 API starts on: **`http://localhost:3000`**
 
### 4️⃣ Run Frontend
 
```bash
cd frontend
npm run dev
```
 
> 🌐 App starts on: **`http://localhost:5173`**
 
---
 
## 💾 Initial State & Persistence
 
* The application starts with the same pre-configured products shown in the Figma design.
* Changes are not saved automatically.
* Clicking **Save my system for later** stores the current configuration in localStorage.
* Saved configurations are restored after refreshing the page or revisiting the application.
* The **Checkout** button clears both the current configuration and the saved data. After refreshing the page, the application loads the original configuration from the Figma design.
 
---
 
## 🔌 API
 
The backend serves product data from local JSON files using Express.
 
```text
GET /api/cameras
GET /api/plans
GET /api/sensors
GET /api/accessories
```
 
---
 
## 🗄️ State Management
 
**Zustand** manages:
- ✅ Product selections
- 🎨 Variant quantities
- 📊 Review panel state
- 💾 Persisted bundle configuration
---
 
## 📝 Notes
 
- 📦 Product data is **fully data-driven** from JSON files
- 🎁 Backend is included as a **bonus** and serves JSON data through Express endpoints
- 🧱 Focus was placed on **component reusability** and **maintainability**
- 🛒 The **Checkout** button simulates a successful order by clearing the configuration, resetting `localStorage`, and displaying a **confirmation toast**
