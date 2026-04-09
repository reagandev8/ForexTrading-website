# FrankFxTrading

A modern forex education and digital product platform built with the MERN stack (MongoDB, Express, React, Node.js).

## Features
- **Frontend**: React.js, Tailwind CSS, Framer Motion for smooth animations.
- **Backend**: Node.js, Express, MongoDB.
- **Authentication**: JWT-based login and registration.
- **Pages Included**: Landing Page, Courses, PDF Store, VIP Subscription, User Dashboard.
- **UI/UX**: Dark theme style for a premium trading feel.

## Folder Structure
- `/frontend`: Contains the React.js client application.
- `/backend`: Contains the Node.js API server.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed and running locally on port 27017 (or update the `.env` file with your remote connection string).

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   node server.js
   ```
   *The server will run on http://localhost:5000*

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Vite development server:
   ```bash
   npm run dev
   ```
   *The app will run on http://localhost:5173*

## Environment Variables
The backend requires a few environment variables. A default `.env` is already provided:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/frankfxtrading
JWT_SECRET=supersecretjwttoken_for_dev
```

## Bonus Features Integrated
- Dark theme premium UI using Tailwind class customizations.
- Custom Framer Motion animations for pages.
- VIP dashboard structure and responsive layouts.
