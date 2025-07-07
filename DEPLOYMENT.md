# Deployment Guide

## Frontend Deployment (Vercel)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy Frontend
```bash
cd frontend
vercel
```

### Step 3: Set Environment Variables
After deployment, go to Vercel dashboard and add:
- `VITE_API_URL`: Your Render backend URL (e.g., `https://your-app.onrender.com/api`)

## Backend Deployment (Render)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

### Step 2: Deploy on Render
1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `note-app-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Step 3: Get Backend URL
After deployment, copy the URL (e.g., `https://your-app.onrender.com`)

### Step 4: Update Frontend Environment
Go back to Vercel dashboard and update:
- `VITE_API_URL`: `https://your-app.onrender.com/api`

## Alternative: Manual Deployment

### Frontend (Vercel)
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Set root directory to `frontend`
4. Deploy

### Backend (Render)
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect GitHub repo
4. Set root directory to `backend`
5. Deploy

## Environment Variables

### Frontend (Vercel)
- `VITE_API_URL`: Backend API URL

### Backend (Render)
- `NODE_ENV`: `production`
- `PORT`: `10000` (or let Render assign) 