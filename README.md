# SpeedBoost SaaS

A complete production-ready MVP SaaS application for analyzing and optimizing website performance. Built with the MERN stack (MongoDB, Express, React, Node.js) + Tailwind CSS and integrated with Puppeteer & Lighthouse.

## 📁 Project Structure

This is a monorepo containing:
- `/client`: React Frontend
- `/server`: Node.js/Express Backend

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB running locally or a MongoDB Atlas URI

### 1. Start the Backend Server

1. Open a terminal and navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the `server` directory (already created)
   - Make sure your local MongoDB instance is running, or update `MONGO_URI` to your Atlas connection string.
4. Start the backend:
   ```bash
   npm run dev
   ```
   *The server will run on http://localhost:5000*

### 2. Start the Frontend Client

1. Open a new terminal and navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client will run on http://localhost:5173*

## 🌟 Features
- **User Authentication**: Secure JWT-based login and registration.
- **Website Management**: Add multiple websites to your dashboard.
- **Performance Scans**: Run comprehensive Lighthouse audits using Puppeteer in the backend. (Includes a graceful mock fallback if Lighthouse isn't configured in the environment).
- **Optimization Engine**: Simulates one-click optimization by compressing images and minifying assets, showing the projected score improvement.
- **Stripe Billing Ready**: UI and backend routes prepared for Stripe Pro upgrades.
- **Modern UI**: Polished, responsive design using Tailwind CSS v4 and Lucide React icons.